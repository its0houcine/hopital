/**
 * Service pour gérer les connexions SSE (Server-Sent Events)
 * avec une gestion robuste des erreurs et des reconnexions
 */

type SSECallback = (data: any) => void;
type SSEErrorCallback = (error: any) => void;

interface SSEOptions {
  retryLimit?: number;
  retryDelay?: number;
  withCredentials?: boolean;
  onOpen?: () => void;
}

export class SSEService {
  private eventSource: EventSource | null = null;
  private url: string;
  private callbacks: Map<string, SSECallback[]> = new Map();
  private errorCallback: SSEErrorCallback | null = null;
  private retryCount = 0;
  private retryTimeout: NodeJS.Timeout | null = null;
  private isConnecting = false;
  private options: Required<SSEOptions>;
  private isActive = true;

  constructor(url: string, options: SSEOptions = {}) {
    this.url = url;
    this.options = {
      retryLimit: options.retryLimit ?? 10,
      retryDelay: options.retryDelay ?? 2000,
      withCredentials: options.withCredentials ?? false,
      onOpen: options.onOpen ?? (() => {}),
    };
  }

  /**
   * Établit la connexion SSE
   */
  public connect(): void {
    if (this.eventSource || this.isConnecting) return;
    
    this.isConnecting = true;
    this.isActive = true;

    try {
      this.eventSource = new EventSource(this.url);
      
      if (this.options.withCredentials) {
        this.eventSource.withCredentials = true;
      }

      this.eventSource.onopen = () => {
        this.retryCount = 0;
        this.isConnecting = false;
        this.options.onOpen();
        console.log(`SSE connection established to ${this.url}`);
      };

      this.eventSource.onerror = (error) => {
        this.handleError(error);
      };

      // Configurer l'écouteur pour le message par défaut
      this.eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.triggerCallbacks('message', data);
        } catch (error) {
          console.error('Error parsing SSE data:', error);
          if (this.errorCallback) {
            this.errorCallback(new Error('Error parsing SSE data'));
          }
        }
      };
    } catch (error) {
      this.isConnecting = false;
      console.error('Error creating EventSource:', error);
      this.scheduleReconnect();
    }
  }

  /**
   * S'abonne à un événement spécifique
   */
  public on(event: string, callback: SSECallback): void {
    if (!this.callbacks.has(event)) {
      this.callbacks.set(event, []);
      
      // Si ce n'est pas l'événement 'message' par défaut, ajouter un écouteur spécifique
      if (event !== 'message' && this.eventSource) {
        this.eventSource.addEventListener(event, (e: MessageEvent) => {
          try {
            const data = JSON.parse(e.data);
            this.triggerCallbacks(event, data);
          } catch (error) {
            console.error(`Error parsing SSE data for event ${event}:`, error);
          }
        });
      }
    }
    
    this.callbacks.get(event)!.push(callback);
  }

  /**
   * Définit le callback d'erreur
   */
  public onError(callback: SSEErrorCallback): void {
    this.errorCallback = callback;
  }

  /**
   * Déclenche tous les callbacks pour un événement donné
   */
  private triggerCallbacks(event: string, data: any): void {
    const callbacks = this.callbacks.get(event);
    if (callbacks) {
      callbacks.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in SSE callback for event ${event}:`, error);
        }
      });
    }
  }

  /**
   * Gère les erreurs de connexion SSE
   */
  private handleError(error: Event): void {
    console.error('SSE connection error:', error);
    
    if (this.errorCallback) {
      this.errorCallback(error);
    }
    
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
    
    this.isConnecting = false;
    
    if (this.isActive) {
      this.scheduleReconnect();
    }
  }

  /**
   * Planifie une tentative de reconnexion avec backoff exponentiel
   */
  private scheduleReconnect(): void {
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
    }
    
    if (this.retryCount >= this.options.retryLimit) {
      console.error(`SSE retry limit (${this.options.retryLimit}) reached. Giving up.`);
      return;
    }
    
    const delay = Math.min(
      this.options.retryDelay * Math.pow(1.5, this.retryCount),
      30000 // Max 30 seconds
    );
    
    console.log(`Scheduling SSE reconnection in ${delay}ms (attempt ${this.retryCount + 1}/${this.options.retryLimit})`);
    
    this.retryTimeout = setTimeout(() => {
      if (this.isActive) {
        this.retryCount++;
        this.connect();
      }
    }, delay);
  }

  /**
   * Ferme la connexion SSE
   */
  public close(): void {
    this.isActive = false;
    
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
      this.retryTimeout = null;
    }
    
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
    
    this.isConnecting = false;
    console.log(`SSE connection to ${this.url} closed`);
  }
}

// Singleton pour gérer les connexions SSE
class SSEManager {
  private connections: Map<string, SSEService> = new Map();

  /**
   * Obtient ou crée une connexion SSE pour une URL donnée
   */
  public getConnection(url: string, options: SSEOptions = {}): SSEService {
    if (!this.connections.has(url)) {
      const service = new SSEService(url, options);
      this.connections.set(url, service);
      service.connect();
    }
    
    return this.connections.get(url)!;
  }

  /**
   * Ferme une connexion SSE spécifique
   */
  public closeConnection(url: string): void {
    const connection = this.connections.get(url);
    if (connection) {
      connection.close();
      this.connections.delete(url);
    }
  }

  /**
   * Ferme toutes les connexions SSE
   */
  public closeAllConnections(): void {
    this.connections.forEach(connection => connection.close());
    this.connections.clear();
  }
}

// Exporter une instance singleton
export const sseManager = new SSEManager();
