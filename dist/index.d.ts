/// <reference types="node" />
export interface Peer {
    host: string;
    port: number;
}
export type PeerSource = (pubkey: Buffer) => Promise<boolean | Peer>;
export declare class PeerDiscovery {
    private _sources;
    registerSource(name: string, source: PeerSource): boolean;
    removeSource(name: string): boolean;
    discover(pubkey: string | Buffer): Promise<Peer | boolean>;
}
