module.exports = {
  title: '智能救援指挥系统',
  baseURL: 'http://localhost:9528',
  // baseURL: 'http://localhost:8888/api/v1',

  /**
   * @type {boolean} true | false
   * @description Whether show the settings right-panel
   */
  showSettings: false,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  errorLog: 'production'
}
