import {
  observable,
  decorate,
  action,
  configure,
  runInAction,
  computed
} from 'mobx';
import axios from 'axios';
import _ from 'lodash';

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
  @observable
  newBucket = { name: '', location: '' };
  @observable
  locations = [];
  @observable
  bucketFiles = [];
  @observable
  selectedBucket = {};

  @action
  fetchBucketList() {
    this.loadingBuckets = true;
    axios.get(`${BASE_URL}/buckets`, HEADERS).then(res => {
      runInAction(() => {
        this.setBuckets(res.data);
      });
    });
  }

  @action
  getLocations() {
    axios.get(`${BASE_URL}/locations`, HEADERS).then(res => {
      runInAction(() => {
        this.setLocations(res.data);
      });
    });
  }

  setLocations = data => {
    this.locations = data.locations;
  };

  setBucketFiles = data => {
    this.bucketFiles = data.objects;
  };

  @computed
  get totalBucketCount() {
    return this.buckets.length;
  }

  @computed
  get totalBucketFilesCount() {
    return this.bucketFiles.length;
  }

  @computed
  get selectedBucketTotalSize() {
    const totalSize = _.sumBy(this.bucketFiles, file => {
      return file.size;
    });
    return totalSize;
  }

  @action
  getBucket = bucketId => {
    const bucket = _.find(this.buckets, bucket => {
      return bucket.id == bucketId;
    });
    this.selectedBucket = bucket;
  };

  @action
  addNewBucketFormOpen() {
    this.isCreateNewBucket = !this.isCreateNewBucket;
  }

  setBuckets = data => {
    this.buckets = data.buckets;
    this.loadingBuckets = false;
  };

  @action
  getBucketFiles = bucketId => {
    axios.get(`${BASE_URL}/buckets/${bucketId}/objects`, HEADERS).then(res => {
      runInAction(() => {
        this.setBucketFiles(res.data);
      });
    });
  };

  @action
  addBucket = () => {
    this.newBucket.id = -1;
    this.buckets.push(this.newBucket);
    axios.post(`${BASE_URL}/buckets`, this.newBucket, HEADERS).then(res => {
      runInAction(() => {
        this.isCreateNewBucket = false;
        var itemIndex = _.findIndex(this.buckets, { id: -1 });
        this.buckets.splice(itemIndex, 1, res.data);
      });
    });
  };

  @action
  addFileToBucket = (file, bucketId) => {
    let formData = new FormData();
    formData.append('file', file);
    const newHeaders = {
      headers: {
        Authorization: HEADERS.headers.Authorization,
        'Content-Type': 'multipart/form-data'
      }
    };
    axios
      .post(`${BASE_URL}/buckets/${bucketId}/objects`, formData, newHeaders)
      .then(res => {
        runInAction(() => {
          this.getBucketFiles(bucketId);
        });
      });
  };

  @action
  removeBucket = bucketId => {
    axios.delete(`${BASE_URL}/buckets/${bucketId}`, HEADERS).then(res => {
      runInAction(() => {
        this.fetchBucketList();
      });
    });
  };
}

var store = (window.store = new BucketStore());

export default store;
