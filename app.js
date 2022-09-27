const Koa = require('koa');

const json = require('koa-json');

const KoaRouter = require('koa-router');

const path = require('path');

const render = require('koa-ejs');

const app = new Koa();
const router = new KoaRouter();

render(app, {
        root: path.join(__dirname, 'views'),
        layout: 'layout',
        viewExt: 'html',
        cache: false,
        debug: false,

    })
    //Pages Sites
router.get('/accueil', async ctx => { await ctx.render('accueil');})

router.get('/films', async ctx => { await ctx.render('films');})

router.get('/series', async ctx => { await ctx.render('series');})

router.get('/header', async ctx => { await ctx.render('header');})

router.get('/inscription', async ctx => { await ctx.render('inscription');})

router.get('/connexion', async ctx => { await ctx.render('connexion');})

router.get('/inscription', async ctx => { await ctx.render('inscription');})

//Pages Dashboards

router.get('/articles', async ctx => { await ctx.render('articles');})

router.get('/categories', async ctx => { await ctx.render('categories');})

router.get('/types', async ctx => { await ctx.render('types');})



//Json Prettier Middleware
app.use(json());

//Simple Middleware
//app.use(async ctx => (ctx.body = { msg: 'Hello World' }));

router.get('/test', ctx => (ctx.body = 'Hello Test'));

//Router MiddleWare
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log('Server started...'));