export default {
    mount: {
        src: '/',
        public: {url: '/', static: false, resolve: true},
    },
    buildOptions:{
        out:'docs',
        metaUrlPath:'snowpack'
    }
};