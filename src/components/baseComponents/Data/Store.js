import { api } from 'boot/axios'

export default class Store {
  constructor (objParams) {
    this.url = !objParams.url ? '' : objParams.url
    this.dataProperty = !objParams.dataProperty ? 'data' : objParams.dataProperty
    this.totalProperty = !objParams.totalProperty ? 'count' : objParams.totalProperty
    this.noPagination = objParams.noPagination || false
    this.baseParams = {
      search: null,
      page_size: 5,
      page: 1,
      count: true
    }
    if (objParams.baseParams) {
      this.baseParams = { ...this.baseParams, ...objParams.baseParams }
    }
    this.lastResponse = null
    this.idStore = objParams.idStore || Math.random(1000).toString()
    this.proccessResult = objParams.proccessResult || null
    this.noPaginationResult = objParams.noPaginationResult || false
  }

  getIdStore () {
    return this.idStore
  }

  setEventBus (EventBus) {
    this.EventBus = EventBus
  }

  async load (baseParams) {
    if (baseParams) {
      this.baseParams = { ...this.baseParams, ...baseParams }
    }

    for (const key in this.baseParams) {
      // eslint-disable-next-line no-prototype-builtins
      if (this.baseParams.hasOwnProperty(key) && this.baseParams[key] === null) {
        delete this.baseParams[key]
      }
    }

    if (!this.lastResponse) {
      this.lastResponse = {}
    }

    return await api
      .get(this.url, {
        params: this.noPagination ? {} : this.baseParams
      })
      .then((resp) => {
        if (this.proccessResult && typeof this.proccessResult === 'function') {
          resp = this.proccessResult(resp)
        }

        if (this.noPaginationResult) {
          return resp.data
        }
        if (this.noPagination) {
          const start = (this.baseParams.page - 1) * (this.baseParams.page_size)
          const end = this.baseParams.page_size
          this.lastResponse[this.totalProperty] = resp.data.length
          this.lastResponse[this.dataProperty] = resp.data.splice(start, end)
        } else {
          this.lastResponse[this.dataProperty] = resp.data[this.dataProperty]
          this.lastResponse[this.totalProperty] = resp.data[this.totalProperty]
        }
        return { ...this.lastResponse }
      })
      .catch((error) => {
        this.lastResponse = []
        this.lastResponse[this.dataProperty] = []
        this.lastResponse[this.totalProperty] = 0
        this.lastResponse.error = error
        return this.lastResponse
      })
      .finally(() => {})
  }

  getPage () {
    return this.baseParams.page
  }

  getPageSize () {
    return this.baseParams.page_size
  }

  getData () {
    return this.lastResponse ? this.lastResponse[this.dataProperty] : []
  }

  getBaseParams () {
    return this.baseParams
  }

  getTotalRows () {
    return this.lastResponse ? this.lastResponse[this.totalProperty] : 0
  }

  getEventBus () {
    return this.EventBus
  }

  getFields () {
    return this.fields
  }
}
