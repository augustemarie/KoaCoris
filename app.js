const Koa = require('koa');

const json = require('koa-json');

const KoaRouter = require('koa-router');

const path = require('path');

const render = require('koa-ejs');

const serve = require('koa-static');

const cors = require ('koa-cors');

const router = new KoaRouter();

exports.createServer=function (){
        const app = new Koa()
        const koaOptions = {
                origin:true,
                credentials: true,

        }
        render(app, {
                root: path.join(__dirname, 'views'),
                layout: 'layout',
                viewExt: 'html',
                cache: false,
                debug: false,

        })

        app.use(json());

        app.use(serve(path.join(__dirname, 'public')));

        app.use(router.routes()).use(router.allowedMethods());
        app.use(cors(koaOptions));

        app.listen(3000,() => console.log('Server started...'));

};



    //Pages Sites



router.get('/', async ctx => {
        await ctx.redirect("/index");
})
router.get('/dashboard/categories', async ctx =>{ await ctx.render('/dashboard/categories')})
router.get('/dashboard/types', async ctx =>{ await ctx.render('/dashboard/types')})
router.get('/dashboard/articles', async ctx =>{ await ctx.render('/dashboard/articles')})
router.get('/dashboard/categories', async ctx =>{ await ctx.render('/dashboard/categories')})

router.get('/index', async ctx => { await ctx.render('index');})

router.get('/films', async ctx => { await ctx.render('films');})

router.get('/series', async ctx => { await ctx.render('series');})

router.get('/news', async ctx => { await ctx.render('news');})

router.get('/become', async ctx => { await ctx.render('become');})

router.get('/header', async ctx => { await ctx.render('header');})

router.get('/login', async ctx => { await ctx.render('login');})

router.get('/sign-up', async ctx => { await ctx.render('sign-up');})

router.get('/discover',async ctx => { await ctx.render('discover');})

//Pages Dashboards

router.get('/articles', async ctx => { await ctx.render('articles');})

router.get('/categories', async ctx => { await ctx.render('categories');})

router.get('/types', async ctx => { await ctx.render('types');})



//Json Prettier Middleware

//Simple Middleware
//app.use(async ctx => (ctx.body = { msg: 'Hello World' }));

router.get('/test', ctx => (ctx.body = 'Hello Test'));


//Router MiddleWare

exports.createServer()