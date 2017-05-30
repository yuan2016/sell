import App from '../App';

const goods = r => require.ensure([], () => r(require('../components/goods/goods')), 'goods');
const ratings = r => require.ensure([], () => r(require('../components/ratings/ratings')), 'ratings');
const seller = r => require.ensure([], () => r(require('../components/seller/seller')), 'seller');
const home = r => require.ensure([], () => r(require('../components/home/home')), 'home');
const search = r => require.ensure([], () => r(require('../components/search/search')), 'search');
const shopping = r => require.ensure([], () => r(require('../components/shopping/shopping')), 'shopping');
const my = r => require.ensure([], () => r(require('../components/my/my')), 'my');
const simpleSeller = r => require.ensure([], () => r(require('../components/simpleSeller/simpleSeller')), 'simpleSeller');

export default [{
  path: '/',
  component: App,
  children: [{path: '', redirect: '/home'},
  { path: '/home', component: home },
    { path: '/search', component: search },
    { path: '/shopping', component: shopping },
    { path: '/my', component: my },
    { path: '/simpleSeller',
      component: simpleSeller,
      children: [{path: '', redirect: '/goods'},
        { path: '/goods', component: goods },
        { path: '/ratings', component: ratings },
        { path: '/seller', component: seller }]}
  ]
}];
