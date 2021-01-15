// components/misc/custom-modal.js
Component({
  properties: {
    modalContent: Object
  },
  data: {
    // modalContent: {
    //   title: "Error!",
    //   content: "This is some error message",
    //   image: "/images/fail.png",
    //   goBack: true
    // }
  },
  ready() {
    console.log('data in modal', this.data)
  },
  methods: {
    hideModal() {
      this.triggerEvent('display', { showModal: false, goBack: this.data.modalContent.goBack })
    }
  }
})
