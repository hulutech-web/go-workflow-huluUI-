<template>
  <div>
    <NodeWrap v-if="currentNode.type == 'start' || currentNode.type == 'approver' || currentNode.type == 'notifier'" :node="currentNode"
      @addnode="addnode" @delNode="delNode" />
    <ConditionNode v-if="currentNode.type == 'condition'" v-model:node="currentNode" @addnode="addnode"
      @delConditionNode="delConditionNode" @addConditionFactor="addConditionFactor" />
    <BranchWrap v-if="currentNode.type == 'route'" :node="currentNode" @addnode="addnode" @delNode="delNode" />
  </div>
</template>
<script>
import NodeWrap from './node-wrap.vue'
import ConditionNode from './condition-node.vue'
import BranchWrap from './branch-wrap.vue'
export default {
  name: 'Node',
  components: {
    NodeWrap,
    BranchWrap,
    ConditionNode
  },
  props: {
    node: {
      type: Object,
      default: undefined
    }
  },
  data() {
    return {
      currentNode: {}
    }
  },
  watch: {
    node: {
      handler(newVal) {
        this.currentNode = newVal
      },
      immediate: true
    }
  },
  methods: {
    addnode(node) {
      // console.log('node 新节点:')
      // console.log(node)
      this.$emit('addnode', node)
    },
    delNode() {
      this.$emit('delNode')
    },
    delConditionNode() {
      this.$emit('delConditionNode')
    },
    addConditionFactor(node) {
      this.$emit('addConditionFactor', node)
      this.currentNode = node
      // console.log(this.node)
    }
  }
}
</script>
