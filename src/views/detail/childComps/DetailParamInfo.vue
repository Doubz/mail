<template>
  <div class="param_info" v-if="Object.keys(paramsInfo).length !== 0">
    <div class="size">
      <table class="table_size">
        <tr v-for="(item) in paramsInfo.rule.tables[0]">
            <td v-for="(item1,indez) in item">
              {{item1}}
            </td>
        </tr>
      </table>
      <table class="product_desc">
        <tr v-for="(item) in paramsInfo.info.set">
          <td v-for="(item1) in item">{{item1}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name:"DetailParamInfo",
  props:{
    paramsInfo:{
      type:Object,
      default:{}
    }
  },
  methods:{

  },

}
</script>

<style scoped>
.param_info{
  padding: 25px 15px;
  font-size:14px;
  border-bottom: 5px solid #f2f5f8;
}
.table_size{
  width: 100vw;
}
.table_size tr,.product_desc tr{
  height: 42px;
}
.table_size tr td,.product_desc tr td{
  border-bottom: 1px solid rgba(100,100,100,.1);
}
.product_desc tr td:first-of-type{
  width: 84px;
}
.product_desc tr td:nth-of-type(2){
  color: var(--color-tint);
}
</style>