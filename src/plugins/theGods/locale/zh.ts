import { GOD_QUERY_STRING as GQS } from '../constants'

export default {
  name: 'zh',
  theGods: {
    names: {},
    acts: {},
    queryString: {
      [GQS.YG]: '年神',
      [GQS.MG]: '月神',
      [GQS.DG]: '日神',
      [GQS.HG]: '時神',
      [GQS.TDG]: '本日神煞',
      [GQS.DBYG]: '本日黃黑十二神',
      [GQS.HBYG]: '此時黃黑十二神',
      [GQS.DTG]: '建除十二神',
      [GQS.YLLG]: '年長生十二神',
      [GQS.MLLG]: '月長生十二神',
      [GQS.DLLG]: '日長生十二神',
      [GQS.HLLG]: '時長生十二神',
      [GQS.GA]: '宜',
      [GQS.GA1]: '宜1',
      [GQS.GA2]: '宜2',
      [GQS.GA3]: '宜3',
      [GQS.BA]: '忌',
      [GQS.BA1]: '忌1',
      [GQS.BA2]: '忌2',
      [GQS.BA3]: '忌3'
    }
  }
}
