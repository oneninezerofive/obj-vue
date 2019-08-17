import Vue from 'vue'
//第三方组件
//搜索
import {
    //图片懒加载
    Lazyload,
    Search
    //宫格
    ,
    Grid,
    GridItem
    //分割线
    ,
    Divider
    //下拉菜单
    ,
    DropdownMenu,
    DropdownItem,
    //底部标签栏
    Tabbar,
    TabbarItem,
    Swipe,
    SwipeItem,
    Card,
    // 单元格 
    Cell,
    CellGroup,
    //List
    List,
    Field,
    //导航栏
    NavBar,
    //索引兰
    IndexBar,
    IndexAnchor,
    //手机验证
    button,
    //遮罩层
    Popup,
    //上拉菜单
    ActionSheet,
    //加入购物车
    Sku,
    //商品 导航
    GoodsAction,
    GoodsActionIcon,
    GoodsActionButton,
    //轻提示
    Toast,
    //提交订单栏
    SubmitBar,
    Row,
    Col

} from 'vant';

//mint
import {
    //头部
    Header
} from 'mint-ui';




export default () => {
    Vue.use(Divider);
    Vue.use(Grid).use(GridItem);
    Vue.use(Search);
    Vue.use(DropdownMenu).use(DropdownItem);
    Vue.use(Tabbar).use(TabbarItem);
    Vue.use(Swipe).use(SwipeItem);
    Vue.use(Card);
    Vue.use(Field);
    Vue.use(Cell).use(CellGroup);
    Vue.use(List);
    Vue.use(NavBar);
    Vue.use(IndexBar).use(IndexAnchor);
    Vue.use(Popup);
    Vue.use(Lazyload);
    Vue.use(ActionSheet);
    Vue.use(Sku);
    Vue
        .use(GoodsAction)
        .use(GoodsActionIcon)
        .use(GoodsActionButton);
    Vue.use(Toast);
    Vue.use(SubmitBar);



    //mint 
    Vue.component(Header.name, Header);
    Vue.use(button);
    Vue.use(Row).use(Col);
}