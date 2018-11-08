import {
  observable,
  decorate,
  action,
  configure,
  runInAction,
  computed
} from 'mobx';
import axios from 'axios';

const API_KEY = process.env.SECURE_CLOUD_STORAGE_API_KEY;
const BASE_URL = 'https://challenge.3fs.si/storage';
const HEADERS = {
  headers: {
    Authorization: `Token ${API_KEY}`
  }
};

configure({ enforceActions: 'observed' });

class BucketStore {
  @observable
  buckets = [];
  @observable
  loadingBuckets = false;
  @observable
  isCreateNewBucket = false;

  @action
  fetchBucketList() {
    this.loadingBuckets = true;
    axios.get(`${BASE_URL}/buckets`, HEADERS).then(res => {
      runInAction(() => {
        this.setBuckets(res.data);
      });
    });
  }

  @computed
  get totalBucketCount() {
    return this.buckets.length;
  }

  @action
  addNewBucketFormOpen() {
    this.isCreateNewBucket = !this.isCreateNewBucket;
  }

  setBuckets(data) {
    this.buckets = data.buckets;
    this.loadingBuckets = false;
  }
}

// decorate(BucketStore, {
//   buckets: observable,
//   loadingBuckets: observable,
//   isCreateNewBucket: observable,
//   fetchBucketList: action,
//   addNewBucketFormOpen: action,
//   totalBucketCount: computed
// });

var store = (window.store = new BucketStore());

export default store;
