import { Knex } from 'knex';
export declare class SeederService {
    private readonly knex;
    constructor(knex: Knex);
    seed(): Promise<void>;
}
