import { observable, decorate, action, configure, runInAction } from 'mobx';
import axios from 'axios';

const apiKey = process.env.SECURE_CLOUD_STORAGE_API_KEY;

configure({ enforceActions: 'observed' });

class BucketStore {
  buckets = [];
  loadingBuckets = false;
  isCreateNewBucket = false;

  fetchBucketList() {
    this.loadingBuckets = true;
    axios
      .get('https://challenge.3fs.si/storage/buckets', {
        headers: {
          Authorization: `Token ${apiKey}`
        }
      })
      .then(res => {
        runInAction(() => {
          this.setBuckets(res.data);
        });
      });
  }

  addNewBucketFormOpen() {
    this.isCreateNewBucket = !this.isCreateNewBucket;
  }

  setBuckets(data) {
    this.buckets = data.buckets;
    this.loadingBuckets = false;
  }
}

decorate(BucketStore, {
  buckets: observable,
  loadingBuckets: observable,
  isCreateNewBucket: observable,
  fetchBucketList: action,
  addNewBucketFormOpen: action
});

var store = (window.store = new BucketStore());

export default store;
