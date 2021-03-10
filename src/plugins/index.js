import { Input,Button,Radio,Upload,RadioGroup,Tree,Table,TableColumn,Loading,Card,Row,Col,DatePicker,Tooltip,Popover,TabPane,Tabs,Checkbox,Select,Option } from 'element-ui'
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
    Vue.use(Loading)
    Vue.use(Card)
    Vue.use(Row)
    Vue.use(Col)
    Vue.use(DatePicker)
    Vue.use(Tooltip)
    Vue.use(Popover)
    Vue.use(TabPane)
    Vue.use(Tabs)
    Vue.use(Checkbox)
    Vue.use(Select)
    Vue.use(Option)
  }
}
export default element