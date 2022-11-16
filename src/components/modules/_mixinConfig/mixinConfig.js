import config from 'src/conf/conf.js'

export default {
  data() {
    return {
      apiName: 'api',
      moduleName: null,
      serviceName: null
    }
  },
  computed: {
    getServices() {
      return config[this.apiName].services && config[this.apiName].services[this.moduleName] ? config[this.apiName].services[this.moduleName] : null
    }
  },
  methods: {
    getConfig(apiName, moduleName, serviceName) {
      return config[apiName][moduleName][serviceName] || config[apiName][moduleName] || config[apiName] || null
    },
  }
}
