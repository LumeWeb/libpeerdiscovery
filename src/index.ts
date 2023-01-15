import b4a from "b4a";

export interface Peer {
  host: string;
  port: number;
}

export type PeerSource = (
  pubkey: Buffer,
  options?: any
) => Promise<boolean | Peer>;

export class PeerDiscovery {
  private _sources: Map<string, PeerSource> = new Map<string, PeerSource>();

  public registerSource(name: string, source: PeerSource): boolean {
    if (this._sources.has(name)) {
      return false;
    }
    this._sources.set(name, source);

    return true;
  }

  public removeSource(name: string): boolean {
    if (!this._sources.has(name)) {
      return false;
    }

    this._sources.delete(name);

    return true;
  }

  public removeAllSources(): void {
    this._sources.clear();
  }

  public sourceExists(name: string): boolean {
    return this._sources.has(name);
  }

  public async discover(
    pubkey: string | Buffer,
    options = {}
  ): Promise<Peer | boolean> {
    if (!b4a.isBuffer(pubkey)) {
      pubkey = b4a.from(pubkey, "hex") as Buffer;
    }

    for (const source of this._sources.values()) {
      const result = await source(pubkey, options);

      if (result) {
        return result;
      }
    }

    return false;
  }
}
