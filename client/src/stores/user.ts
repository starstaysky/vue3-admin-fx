import { defineStore } from 'pinia'

interface userStore {
  count: number
}

export const userStore = defineStore('user', {
  state: (): userStore => {
    return {
      count: 0
    }
  },
  actions: {
    increment: function () {
      this.count++
    }
  }
})
