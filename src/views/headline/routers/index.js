// 引用pages
// import demoindex from '@/views/demo/index'
import HeadlineList from '@/views/headline/components/HeadlineList'
import HeadLineSplitAndList from '@/views/headline/components/HeadlineSplitAndList'
import HeadLineConstructAndList from '@/views/headline/components/HeadLineConstructAndList'

// 定义路由路径数组列表
export default[
  {
    path: '/headline/:pagetyp',
    name: 'index',
    component: HeadlineList
  }
]
