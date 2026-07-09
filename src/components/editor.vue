<template>
  <div class="screen">
    <MenuBar 
      @save="$root.saveAB(currentAB)"
      @rename="$root.renameAB(currentAB)"
      @print="$root.printAB(currentAB)"
    />
    <Tabs :abs="abs" :selected-index="currentABIndex" @change-tab="selectAB"/>
    <div class="flex-1" style="display: grid; grid-template-columns: 1fr 1fr; overflow: hidden">
      
      <template v-for="(ab, i) in abs">
        <CodemirrorEditor ref="codemirrorEditor" :sync-object="ab" sync-attribute="html" v-show="i===currentABIndex" @change="updatePreview()"/>
      </template>
      <Preview ref="preview"/>
    </div>
  </div>
</template>

<script>
import { nextTick } from 'vue';
import CodemirrorEditor from './codemirror-editor.vue';
import MenuBar from './menu-bar.vue';
import Preview from './preview.vue';
import Tabs from './tabs.vue';

export default{
  components: {
    CodemirrorEditor, MenuBar, Preview, Tabs
  },
  props: {
    abs: Array
  },
  computed: {
    currentAB(){
      return this.abs[this.currentABIndex];
    }
  },
  data(){
    return {
      currentABIndex: 0
    }
  },  
  methods: {
    updatePreview(){
      let t=this.currentAB.html;
      this.$refs.preview.setContent(t);
    },
    selectAB(index){
      this.currentABIndex=index;
      nextTick(()=>{
        this.$refs.codemirrorEditor[index].updateText();
        this.updatePreview();
      })
    }
  }
}
</script>
