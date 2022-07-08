import { crmStore } from 'Frontend/stores/app-store';
import { makeAutoObservable } from 'mobx';

class DashBoardViewStore {
  constructor() {
    makeAutoObservable(this);
  }

  get contactCount() {
    return crmStore.contacts.length;
  }

  get companyStats() {
    const countByCompany = crmStore.contacts.reduce((map, contact) => {
      const name = contact.company?.name || 'Unknown';
      return map.set(name, (map.get(name) || 0) + 1);
    }, new Map<string, number>());

    //Array de valores compatible con la pie chart API de Hilia
    return Array.from(countByCompany.entries()).map(([company, employees]) => ({
      name: company,
      y: employees,
    }));
  }
}

export const dashboardViewStore = new DashBoardViewStore();
