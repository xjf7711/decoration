import {IStyle} from "type-dom.ts";

export interface IPlace {
  name: string;
  styleObj: {
    background: string | null,
  };
  jpgNameArr: string[];
}

export interface IManner {
  name: string;
  styleObj: Partial<IStyle>;
  children: IPlace[];
}

export const mannerList: IManner[] = [
  {
    name: '中式',
    styleObj: {
      background: '#409EFF',
    },
    children: [{
      name: '客餐厅',
      styleObj: {
        background: '#409EFF',
      },
      jpgNameArr: ['00125.jpg', '0011.jpg', '00110.jpg', '00111.jpg', '00112.jpg', '00113.jpg', '00114.jpg', '00115.jpg', '00116.jpg', '00117.jpg', '00118.jpg', '00119.jpg', '0012.jpg', '00120.jpg', '00121.jpg', '00122.jpg', '00123.jpg', '00124.jpg', '00126.jpg', '00127.jpg', '00128.jpg', '00129.jpg', '0013.jpg', '00130.jpg', '00131.jpg', '00132.jpg', '00133.jpg', '00134.jpg', '00135.jpg', '00136.jpg', '00137.jpg', '00138.jpg', '00139.jpg', '0014.jpg', '00140.jpg', '00141.jpg', '00142.jpg', '00143.jpg', '00144.jpg', '00145.jpg', '00146.jpg', '00147.jpg', '0015.jpg', '0016.jpg', '0017.jpg', '0018.jpg', '0019.jpg'],
    }, {
      name: '客厅',
      styleObj: {
        background: null,
      },
      jpgNameArr: ['0011.jpg', '00110.jpg', '00111.jpg', '00112.jpg', '00113.jpg', '00114.jpg', '00115.jpg', '00116.jpg', '00117.jpg', '00118.jpg', '00119.jpg', '0012.jpg', '00120.jpg', '00121.jpg', '00122.jpg', '00123.jpg', '00124.jpg', '00125.jpg', '0013.jpg', '0014.jpg', '0015.jpg', '0016.jpg', '0017.jpg', '0018.jpg', '0019.jpg'],
    }, {
      name: '餐厨',
      styleObj: {
        background: null,
      },
      jpgNameArr: ['0011.jpg', '00110.jpg', '00111.jpg', '00112.jpg', '0012.jpg', '0013.jpg', '0014.jpg', '0015.jpg', '0016.jpg', '0017.jpg', '0018.jpg', '0019.jpg'],
    }, {
      name: '卧室',
      styleObj: {
        background: null,
      },
      jpgNameArr: ['0011.jpg', '00110.jpg', '00111.jpg', '0012.jpg', '0013.jpg', '0014.jpg', '0015.jpg', '0016.jpg', '0017.jpg', '0018.jpg', '0019.jpg'],
    }, {
      name: '卫浴',
      styleObj: {
        background: null,
      },
      jpgNameArr: ['0011.jpg', '0012.jpg', '0013.jpg', '0014.jpg'],
    }, {
      name: '书房',
      styleObj: {
        background: null,
      },
      jpgNameArr: ['0011.jpg', '0012.jpg', '0013.jpg', '0014.jpg'],
    }],
  },
  {
    name: '现代',
    styleObj: {
      background: '',
    },
    children: [{
      name: '客餐厅',
      styleObj: {
        background: '',
      },
      jpgNameArr: ['0011.jpg', '00110.jpg', '00111.jpg', '00112.jpg', '00113.jpg', '00114.jpg', '00115.jpg', '00116.jpg', '00117.jpg', '00118.jpg', '00119.jpg', '0012.jpg', '00120.jpg', '00121.jpg', '00122.jpg', '00123.jpg', '00124.jpg', '00125.jpg', '00126.jpg', '00127.jpg', '00128.jpg', '00129.jpg', '0013.jpg', '00130.jpg', '00131.jpg', '00132.jpg', '00133.jpg', '00134.jpg', '00135.jpg', '00136.jpg', '00137.jpg', '00138.jpg', '00139.jpg', '0014.jpg', '00140.jpg', '00141.jpg', '00142.jpg', '00143.jpg', '00144.jpg', '00145.jpg', '00146.jpg', '00147.jpg', '00148.jpg', '00149.jpg', '0015.jpg', '00150.jpg', '00151.jpg', '00152.jpg', '00153.jpg', '00154.jpg', '00155.jpg', '00156.jpg', '00157.jpg', '00158.jpg', '00159.jpg', '0016.jpg', '00160.jpg', '00161.jpg', '00162.jpg', '00163.jpg', '00164.jpg', '00165.jpg', '00166.jpg', '00167.jpg', '00168.jpg', '00169.jpg', '0017.jpg', '00170.jpg', '00171.jpg', '00172.jpg', '00173.jpg', '00174.jpg', '00175.jpg', '00176.jpg', '00177.jpg', '00178.jpg', '00179.jpg', '0018.jpg', '00180.jpg', '00181.jpg', '00182.jpg', '00183.jpg', '00184.jpg', '00185.jpg', '00186.jpg', '00187.jpg', '00188.jpg', '00189.jpg', '0019.jpg', '00190.jpg', '00191.jpg', '00192.jpg', '00193.jpg', '00194.jpg', '00195.jpg', '00196.jpg', '00197.jpg'],
    }, {
      name: '客厅',
      styleObj: {
        background: '',
      },
      jpgNameArr: ['0011.jpg', '00110.jpg', '00111.jpg', '00112.jpg', '0012.jpg', '0013.jpg', '0014.jpg', '0015.jpg', '0016.jpg', '0017.jpg', '0018.jpg', '0019.jpg'],
    }, {
      name: '餐厨',
      styleObj: {
        background: '',
      },
      jpgNameArr: ['0011.jpg', '00110.jpg', '0012.jpg', '0013.jpg', '0014.jpg', '0015.jpg', '0016.jpg', '0017.jpg', '0018.jpg', '0019.jpg'],
    }, {
      name: '卧室',
      styleObj: {
        background: '',
      },
      jpgNameArr: ['0011.jpg', '00110.jpg', '00111.jpg', '00112.jpg', '00113.jpg', '00114.jpg', '00115.jpg', '00116.jpg', '0012.jpg', '0013.jpg', '0014.jpg', '0015.jpg', '0016.jpg', '0017.jpg', '0018.jpg', '0019.jpg'],
    }, {
      name: '卫浴',
      styleObj: {
        background: '',
      },
      jpgNameArr: ['0011.jpg', '0012.jpg', '0013.jpg', '0014.jpg'],
    }, {
      name: '书房',
      styleObj: {
        background: '',
      },
      jpgNameArr: [],
    }],
  },
  {
    name: '新古典',
    styleObj: {
      background: '',
    },
    children: [{
      name: '客餐厅',
      styleObj: {
        background: '',
      },
      jpgNameArr: ['0011.jpg', '00110.jpg', '00111.jpg', '00112.jpg', '00113.jpg', '00114.jpg', '00115.jpg', '00116.jpg', '00117.jpg', '00118.jpg', '00119.jpg', '0012.jpg', '00120.jpg', '00121.jpg', '00122.jpg', '00123.jpg', '00124.jpg', '00125.jpg', '00126.jpg', '00127.jpg', '00128.jpg', '00129.jpg', '0013.jpg', '00130.jpg', '00131.jpg', '00132.jpg', '00133.jpg', '00134.jpg', '00135.jpg', '00136.jpg', '00137.jpg', '00138.jpg', '00139.jpg', '0014.jpg', '0015.jpg', '0016.jpg', '0017.jpg', '0018.jpg', '0019.jpg'],
    }, {
      name: '客厅',
      styleObj: {
        background: '',
      },
      jpgNameArr: ['0011.jpg', '00110.jpg', '00111.jpg', '0012.jpg', '0013.jpg', '0014.jpg', '0015.jpg', '0016.jpg', '0017.jpg', '0018.jpg', '0019.jpg'],
    }, {
      name: '餐厨',
      styleObj: {
        background: '',
      },
      jpgNameArr: ['0011.jpg', '0012.jpg', '0013.jpg'],
    }, {
      name: '卧室',
      styleObj: {
        background: '',
      },
      jpgNameArr: ['0011.jpg', '00110.jpg', '00111.jpg', '00112.jpg', '0012.jpg', '0013.jpg', '0014.jpg', '0015.jpg', '0016.jpg', '0017.jpg', '0018.jpg', '0019.jpg'],
    }, {
      name: '卫浴',
      styleObj: {
        background: '',
      },
      jpgNameArr: ['0011.jpg', '0012.jpg', '0013.jpg'],
    }, {
      name: '书房',
      styleObj: {
        background: '',
      },
      jpgNameArr: [],
    }],
  },
  {
    name: '欧式',
    styleObj: {
      background: '',
    },
    children: [{
      name: '客餐厅',
      styleObj: {
        background: '',
      },
      jpgNameArr: ['0011.jpg', '00110.jpg', '00111.jpg', '00112.jpg', '00113.jpg', '00114.jpg', '00115.jpg', '00116.jpg', '00117.jpg', '00118.jpg', '00119.jpg', '0012.jpg', '00120.jpg', '00121.jpg', '00122.jpg', '00123.jpg', '00124.jpg', '00125.jpg', '00126.jpg', '00127.jpg', '00128.jpg', '00129.jpg', '0013.jpg', '00130.jpg', '00131.jpg', '0014.jpg', '0015.jpg', '0016.jpg', '0017.jpg', '0018.jpg', '0019.jpg'],
    }, {
      name: '客厅',
      styleObj: {
        background: '',
      },
      jpgNameArr: ['0011.jpg', '00110.jpg', '00111.jpg', '00112.jpg', '00113.jpg', '00114.jpg', '00115.jpg', '00116.jpg', '00117.jpg', '00118.jpg', '0012.jpg', '0013.jpg', '0014.jpg', '0015.jpg', '0016.jpg', '0017.jpg', '0018.jpg', '0019.jpg'],
    }, {
      name: '餐厨',
      styleObj: {
        background: '',
      },
      jpgNameArr: ['0011.jpg', '0012.jpg', '0013.jpg', '0014.jpg', '0015.jpg'],
    }, {
      name: '卧室',
      styleObj: {
        background: '',
      },
      jpgNameArr: ['0011.jpg', '0012.jpg', '0013.jpg', '0014.jpg', '0015.jpg', '0016.jpg', '0017.jpg'],
    }, {
      name: '卫浴',
      styleObj: {
        background: '',
      },
      jpgNameArr: ['0011.jpg', '0012.jpg', '0013.jpg'],
    }, {
      name: '书房',
      styleObj: {
        background: '',
      },
      jpgNameArr: [],
    }],
  },
  {
    name: '美式',
    styleObj: {
      background: '',
    },
    children: [{
      name: '客餐厅',
      styleObj: {
        background: '',
      },
      jpgNameArr: ['0011.jpg', '00110.jpg', '00111.jpg', '00112.jpg', '00113.jpg', '00114.jpg', '00115.jpg', '00116.jpg', '00117.jpg', '00118.jpg', '00119.jpg', '0012.jpg', '00120.jpg', '00121.jpg', '00122.jpg', '00123.jpg', '00124.jpg', '00125.jpg', '00126.jpg', '00127.jpg', '00128.jpg', '00129.jpg', '0013.jpg', '00130.jpg', '00131.jpg', '00132.jpg', '00133.jpg', '00134.jpg', '00135.jpg', '00136.jpg', '00137.jpg', '00138.jpg', '00139.jpg', '0014.jpg', '00140.jpg', '00141.jpg', '00142.jpg', '00143.jpg', '00144.jpg', '00145.jpg', '00146.jpg', '00147.jpg', '00148.jpg', '00149.jpg', '0015.jpg', '00150.jpg', '0016.jpg', '0017.jpg', '0018.jpg', '0019.jpg'],
    }, {
      name: '客厅',
      styleObj: {
        background: '',
      },
      jpgNameArr: ['0011.jpg', '00110.jpg', '00111.jpg', '00112.jpg', '0012.jpg', '0013.jpg', '0014.jpg', '0015.jpg', '0016.jpg', '0017.jpg', '0018.jpg', '0019.jpg'],
    }, {
      name: '餐厨',
      styleObj: {
        background: '',
      },
      jpgNameArr: ['0011.jpg', '0012.jpg', '0013.jpg', '0014.jpg', '0015.jpg'],
    }, {
      name: '卧室',
      styleObj: {
        background: '',
      },
      jpgNameArr: ['0011.jpg', '0012.jpg', '0013.jpg', '0014.jpg', '0015.jpg', '0016.jpg', '0017.jpg', '0018.jpg'],
    }, {
      name: '卫浴',
      styleObj: {
        background: '',
      },
      jpgNameArr: ['0011.jpg'],
    }, {
      name: '书房',
      styleObj: {
        background: '',
      },
      jpgNameArr: [],
    }],
  },
  {
    name: '北欧',
    styleObj: {
      background: '',
    },
    children: [{
      name: '客餐厅',
      styleObj: {
        background: '',
      },
      jpgNameArr: ['0011.jpg', '00110.jpg', '00111.jpg', '00112.jpg', '00113.jpg', '00114.jpg', '00115.jpg', '00116.jpg', '00117.jpg', '00118.jpg', '00119.jpg', '0012.jpg', '00120.jpg', '00121.jpg', '0013.jpg', '0014.jpg', '0015.jpg', '0016.jpg', '0017.jpg', '0018.jpg', '0019.jpg'],
    }, {
      name: '客厅',
      styleObj: {
        background: '',
      },
      jpgNameArr: ['0011.jpg'],
    }, {
      name: '餐厨',
      styleObj: {
        background: '',
      },
      jpgNameArr: [],
    }, {
      name: '卧室',
      styleObj: {
        background: '',
      },
      jpgNameArr: ['0011.jpg'],
    }, {
      name: '卫浴',
      styleObj: {
        background: '',
      },
      jpgNameArr: [],
    }, {
      name: '书房',
      styleObj: {
        background: '',
      },
      jpgNameArr: [],
    }],
  },
  {
    name: '法式',
    styleObj: {
      background: '',
    },
    children: [{
      name: '客厅',
      styleObj: {
        background: '',
      },
      jpgNameArr: ['0011.jpg'],
    }, {
      name: '客餐厅',
      styleObj: {
        background: '',
      },
      jpgNameArr: [],
    }, {
      name: '餐厨',
      styleObj: {
        background: '',
      },
      jpgNameArr: ['0011.jpg'],
    }, {
      name: '卧室',
      styleObj: {
        background: '',
      },
      jpgNameArr: [],
    }, {
      name: '卫浴',
      styleObj: {
        background: '',
      },
      jpgNameArr: [],
    }, {
      name: '书房',
      styleObj: {
        background: '',
      },
      jpgNameArr: [],
    }],
  }
];
