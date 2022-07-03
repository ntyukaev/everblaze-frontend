module.exports = {
  style: {
    sass: {
      loaderOptions: {
        additionalData: `
          @import 'src/styles/variables.scss';
          @import 'src/styles/animations.scss';
          @import 'src/styles/functions.scss';
          @import 'src/styles/global.scss';
          @import 'src/styles/mixins.scss';
          @import 'src/styles/typography.scss';
        `
      }
    }
  }
}
