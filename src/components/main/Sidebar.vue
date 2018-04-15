<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="light" unique-opened router>
            <template v-for="(item,i) in items">
                <template v-if="item.subs">
                <template v-if="item.title === checkedTitle">
                    <el-submenu :index="item.index" :key="i">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }} </template>
                          <template v-for="(item,i) in item.subs">
                            <template v-if="item.subs">
                              <el-submenu :index="item.index" :key="i">
                                <template slot="title"><i :class="item.icon"></i>{{ item.title }} </template>
                                <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}</el-menu-item>
                              </el-submenu>
                            </template>
                            <template v-else>
                              <el-menu-item :index="item.index" :key="i"><i :class="item.icon"></i>{{ item.title }} </el-menu-item>
                            </template>
                          </template>
                        </el-menu-item>
                    </el-submenu>
                  </template>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="i">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          icon: 'el-icon-setting',
          index: '/home',
          title: '首页',
          subs: null
        },
        {
          icon: 'el-icon-menu',
          title: '文案管理',
          index: '',
          subs: [
            {
              icon: null,
              index: '/headline/index',
              title: '文案导入',
              subs: null
            },
            {
              icon: null,
              index: '/headline/splitandlist',
              title: '文案切割',
              subs: null
            },
            {
              icon: null,
              index: '/headline/constructandlist',
              title: '文案生成',
              subs: null
            }
          ]
        }
      ]
    }
  },
  props: {
    checkedTitle: {
      type: String,
      default: ''
    }
  },
  beforeMount () {
  },
  methods: {
    showSelectedTitle () {
      console.log(this.checkedTitle)
    }
  },
  computed: {
    onRoutes () {
      return this.$route.path
    }
  },
  watch: {
    checkedTitle (curVal, oldVal) {
      if (curVal) {
        this.checkedTitle = curVal
      }
    }
  }
}
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  width: 200px;
  left: 0;
  top: 70px;
  bottom: 0;
  background: #2e363f;
}
.sidebar > ul {
  height: 100%;
}
</style>
