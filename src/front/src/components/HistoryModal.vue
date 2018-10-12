<template>
  <areal-modal :value='value' :max-width="750" @click='closeModal'>
  <div class="history-modal__title">{{ "Информация о запросе" }}</div>
  <div class="history-modal__close" @click='closeModal' />
    <v-container>
      <v-layout row wrap>
        <v-flex class="history-modal__status" xs12>
          {{ "Статус запроса:" }}
          <span
            :class="'history-modal__status-' + item.status"
          >
            {{ getStatus(item.status) }}
          </span>
        </v-flex>
        <v-flex class='history-modal__error-detail' xs12 v-if='item.errorDetail'>
          <v-list>
            <v-list-group>
              <v-list-tile slot="activator">
                <v-list-tile-content>
                  <v-list-tile-title>{{ "Информация о ошибке" }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile @click="false">
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.errorDetail }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-group>
          </v-list>
        </v-flex>
        <v-flex class="history-modal__btn" xs12>
          <v-btn
            @click='getRequest'
          >
            {{"Посмотреть тело запроса"}}
          </v-btn>
          <v-btn
            @click='getResponse'
          >
            <!-- :disabled='!this.item.path' -->
            {{"Посмотреть тело ответа"}}
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </areal-modal>
</template>

<script>
/* eslint no-underscore-dangle: ["error",{"allow":["_id"]}] */

import ArealModal from './elements/ArealModal';

const getUrlForResponse = item => {
  if (item.status !== 'ok') {
    const created = new Date(item.created);
    return `/getXml/files/${created.toLocaleDateString('sv-SE')}/errors/${item.soapMethod}-${item.companyId}/${item._id}/response.xml`;
  }
  return (item.path)
    ? `/getXml${item.path}`
    : '/getXml/no-file';
};

const getUrlForRequest = item => {
  const created = new Date(item.created);
  return (item.status === 'ok')
    ? `/getXml/files/${item.companyId}-last-request.xml`
    : `/getXml/files/${created.toLocaleDateString('sv-SE')}/errors/${item.soapMethod}-${item.companyId}/${item._id}/request.xml`;
};

/**
 * @param {Object} item
 * @param {string} type
 */
const openFileByEventType = (type, item) => {
  let url;
  switch (type) {
    case 'response':
      url = getUrlForResponse(item);
      break;
    case 'request':
      url = getUrlForRequest(item);
      break;
    default:
      break;
  }
  if (url) {
    window.open(`${window.location.protocol}//${window.location.hostname}:${window.location.port}${url}`, '_blank');
  }
};

export default {
  name: 'HistoryModal',
  props: ['value', 'item'],
  components: {
    ArealModal,
  },
  computed: {
  },
  methods: {
    getStatus(status) {
      switch (status) {
        case 'ok':
          return 'Успешно выполнен';
        case 'start':
          return 'Идет выполнение запроса';
        case 'error':
          return 'Не выполнен';
        default:
          return false;
      }
    },
    getRequest() {
      openFileByEventType('request', this.item);
    },
    getResponse() {
      openFileByEventType('response', this.item);
    },
    closeModal() {
      this.$store.state.modalRequestInfo = false;
    },
  },
};
</script>

<style lang="sass">
.history-modal__title
  font-size: 20px
  margin-top: -25px
  position: relative
.history-modal__close
  &:before, &:after
    content: ""
    position: absolute
    top: -5px
    right: -35px
    width: 26px
    height: 3px
    background: darkgray
    cursor: pointer
  &:before
    webkit-transform: rotate(45deg)
    transform: rotate(45deg)
  &:after
    webkit-transform: rotate(-45deg)
    transform: rotate(-45deg)
  &:hover
    &:before, &:after
      background: black
.history-modal__status
  font-size: 15px
.history-modal__status-ok
  color: green
.history-modal__status-error
  color: red
.history-modal__status-start
  color: blue
.history-modal__error-detail
  .v-list
    .v-list__tile--link
      height: auto
    .v-list__tile__title
      white-space: initial!important
      height: auto
      max-height: 400px
      overflow: auto
.history-modal__btn
  display: v-flex
  margin-left: 30px
  margin-top: 40px
</style>
