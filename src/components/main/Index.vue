<template>
  <div id="index">
    Index
  </div>
</template>
<script type="text/javascript">
export default {
  mounted () {
    this.open()
  },
  methods: {
    open () {
      const h = this.$createElement

      this.$notify({
        title: '欢迎光临',
        message: h('i', { style: 'color: teal' }, '欢迎进入文案管理平台'),
        offset: 200
      })
    }
  }
}
</script>