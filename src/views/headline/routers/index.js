// 引用pages
// import demoindex from '@/views/demo/index'
import HeadlineList from '@/views/headline/components/HeadlineList'
import HeadLineSplitAndList from '@/views/headline/components/HeadlineSplitAndList'
import HeadLineConstructAndList from '@/views/headline/components/HeadLineConstructAndList'

// 定义路由路径数组列表
export default[
  {
    path: '/headline/index',
    name: 'index',
    component: HeadlineList
  },
  {
    path: '/headline/splitandlist',
    name: 'splitandlist',
    component: HeadLineSplitAndList
  },
  {
    path: '/headline/constructandlist',
    name: 'constructandlist',
    component: HeadLineConstructAndList
  }
]
