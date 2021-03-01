import { Input,Button,Radio,Upload,RadioGroup,Tree,Table,TableColumn } from 'element-ui'
const element = {
  install: function (Vue) {
    
    Vue.use(Input)
    Vue.use(Button)
    Vue.use(Radio)
    Vue.use(Upload)
    Vue.use(RadioGroup)
    Vue.use(Tree)
    Vue.use(Table)
    Vue.use(TableColumn)
  }
}
export default element