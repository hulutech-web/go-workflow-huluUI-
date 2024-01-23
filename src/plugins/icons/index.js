import * as Icons from '@ant-design/icons-vue'
const icons = Icons

const setUpIcons=(app)=>{
    for (const i in icons) {
        app.component(i, icons[i])
      }
}
export default setUpIcons