/// <reference types="node" />
export interface Peer {
    host: string;
    port: number;
}
export type PeerSource = (pubkey: Buffer, options?: any) => Promise<boolean | Peer>;
export declare class PeerDiscovery {
    private _sources;
    registerSource(name: string, source: PeerSource): boolean;
    removeSource(name: string): boolean;
    discover(pubkey: string | Buffer, options?: {}): Promise<Peer | boolean>;
}
