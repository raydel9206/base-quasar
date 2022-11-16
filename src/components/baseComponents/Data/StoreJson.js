import Store from './Store'
// hace uso de Vue2Filters

export default class StoreJson extends Store {
  constructor(objParams) {
    super(objParams)
    this.url = null
    this.onlyMySelections = false
    this.root = 'data'
    this.totalProperty = 'count'
    this.propertySearch = objParams.propertySearch || 'denominacion'
    this.myData = []
  }

  loadData(listData) {
    this.myData = listData
    this.load()
  }

  load(baseParams) {
    this.EventBus.$emit('DATA_LOADING', this.idStore)
    if (baseParams) {
      this.baseParams = Object.assign(this.baseParams, baseParams)
    }

    let listData = this.myData.slice()
    if (this.baseParams.search) {
      listData = this.filterBy(listData, this.baseParams.search, this.propertySearch)
    }

    if (!this.lastResponse) {
      this.lastResponse = {}
    }

    const start = (this.baseParams.start - 1) * this.baseParams.limit
    const limit = start + this.baseParams.limit
    this.lastResponse[this.root] = listData.slice(start, limit)
    this.lastResponse[this.totalProperty] = this.myData.length

    const datos = this.getData()
    const total = this.getTotalRows()
    this.EventBus.$emit('DATA_CHANGE', {
      idStore: this.idStore,
      data: datos
    })
    this.EventBus.$emit('TOTAL_CHANGE', {
      idStore: this.idStore,
      total: total
    })
  }

  getOriginalData() {
    return this.myData
  }
}
