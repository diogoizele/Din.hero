import BillRepository from '../data/repositories/BillRepository';
import AsyncStorageBillsService from '../data/services/AsyncStorageBillsService';
import { IBillService } from '../domain/services/IBillService';

// -------------- Bills --------------
export const billsService: IBillService = new AsyncStorageBillsService();
export const billsRepository = new BillRepository(billsService);
