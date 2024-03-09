import { ITypeConfig } from '@type-dom/framework';
import { House } from '../../views/house';

export interface IMenuConfig extends ITypeConfig {
  parent: House;
  left: number;
  styleArr: any[];
  posArr: any[];
}
