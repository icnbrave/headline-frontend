import Axios from '@/assets/js/AxiosPlugin'
import {Loading} from 'element-ui'

export const ERROR_MESSAGE_MAP = {
  'healdine.loading.timeout': '执行命令发送超时'
}

export const HEADLINE_DELETE_FLAG_FALSE = 0;
export const HEADLINE_DELETE_FLAG_TRUE = 1;
  
export const HEADLINE_FLAG_INIT = 0;
export const HEADLINE_FLAG_SPLITED = 1;
export const HEADLINE_FLAG_CONSTRUCTED = 2;
  
export const HEADLINE_SELECT_FLAG_INIT = 0;
export const HEADLINE_SELECT_FLAG_SELECTED = 1;