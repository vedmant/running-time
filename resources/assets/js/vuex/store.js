import { createStore } from 'vuex'
import createLogger from 'vuex/dist/logger'
import auth from './modules/auth'
import toast from './modules/toast'
import entries from './modules/entries'
import allEntries from './modules/all-entries'
import users from './modules/users'
import general from './modules/general'
import reports from './modules/reports'

const debug = process.env.NODE_ENV !== 'production'

export default new createStore({
  strict: debug,
  plugins: debug ? [createLogger()] : [],
  modules: {
    auth,
    toast,
    entries,
    all_entries: allEntries,
    users,
    general,
    reports,
  },
})
