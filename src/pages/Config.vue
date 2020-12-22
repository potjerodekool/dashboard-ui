<template>
  <div class="App jumbotron d-flex">
    <div class="container">
    <div class="row">
      <div class="col-12">
        <duo-list :value="this.state.model"></duo-list>
      </div>    
    </div>
    </div>  
  </div>    
</template>

<script lang="ts">
import {defineComponent, reactive} from 'vue';
import subscriptionService from '../api/SubscriptionService';
import { DuoList } from 'duo-list';
import type { DuoListModel } from 'duo-list/dist/types/DuoListModel'
import type { Option } from 'duo-list/dist/types/Option';

interface State {
  model: DuoListModel;
}

export default defineComponent({
  name: 'Config',  
  components: {
    
  },
  mixins: [subscriptionService],
  
  mounted() {
    const duoList = document.querySelector('duo-list');

    duoList!.addEventListener('value-change', event  => {
        this.handleChange(event as CustomEvent);
      }
    )

    this.loadSubscriptions();
  },

  methods: {
    handleChange(e: CustomEvent) {
      this.state.model = e.detail
    },

    loadSubscriptions() {
      subscriptionService.getSubscriptions()
        .then(response => {
          const subscriptions = response.data;

          const options = response.data.map(value => {
            return {"value": value.id.toString(), "text": value.uri}
          })

          const duoList = document.querySelector('duo-list');
          duoList!.value = {
            leftOptions: options,
            rightOptions: [],
            size: 10
          };
        })
        .catch(error => {
          console.log("error: " + error);
        })
    }
  },
  
  setup() {
    const state = reactive({
      model: {
        leftOptions: [],
        rightOptions: [],
      } as DuoListModel
    });
  
    return {
      state,
    };
  },
});
</script>

<style>
body {
  --dou-list-option-min-width: 20rem;
}
</style>