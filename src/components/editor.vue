<template>
  <div class="screen">
    <MenuBar
      :abs="abs"
      @new-ab="$refs.newAB.open()"
      @save="$root.saveAB(currentAB)"
      @save-as-fragment="$root.saveAsFragment(currentAB)"
      @rename="$root.renameAB(currentAB)"
      @print="$root.printAB(currentAB)"
      @assets="$refs.assetsmanager.open(currentAB)"
      @export="$root.exportAB(currentAB)"
      @close="closeAB(currentABIndex)"
      @fragments="$refs.fragmentManager.open()"
      @help="$refs.help.toggle()"
    />
    <Tabs :abs="abs" :selected-index="currentABIndex" @change-tab="selectAB"/>
    <div class="flex-1" style="position: relative; display: grid; grid-template-columns: 1fr 1fr; overflow: hidden">
      <template v-for="(ab, i) in abs">
        <CodemirrorEditor 
          ref="codemirrorEditor" 
          :sync-object="ab" 
          sync-attribute="html" 
          v-show="i===currentABIndex" 
          @change="handleDocumentChange()" 
          language="ab-html"
        />
      </template>
      <Preview ref="preview" v-show="currentAB"/>
      <Help 
        ref="help"
        @insert="insert"
      />
    </div>
    <AssetsManager ref="assetsmanager"/>
    <FragmentManager @open-fragment="openFragment" :fragments="fragments" ref="fragmentManager"/>
    <NewAb ref="newAB"
      @create="$root.createAB"
    />
  </div>
</template>

<script>
import { nextTick } from 'vue';
import CodemirrorEditor from './codemirror-editor.vue';
import MenuBar from './menu-bar.vue';
import Preview from './preview.vue';
import Tabs from './tabs.vue';
import myHtml from '../functions/ab-html.js';
import AssetsManager from './assets-manager.vue';
import NewAb from './new-ab.vue';
import FragmentManager from './fragment-manager.vue';
import Help from './help.vue';

export default{
  components: {
    CodemirrorEditor, MenuBar, Preview, Tabs, AssetsManager, NewAb, FragmentManager, Help
  },
  props: {
    abs: Array,
    fragments: Array
  },
  computed: {
    currentAB(){
      return this.abs[this.currentABIndex];
    }
  },
  data(){
    return {
      currentABIndex: 0,
      myHtml: myHtml
    }
  },  
  methods: {
    insert(text){
      let cm=this.$refs.codemirrorEditor[this.currentABIndex];
      cm.insert(text);
      cm.editor.focus();
    },
    openFragment(f){
      this.$refs.fragmentManager.close();
      this.$root.openAB(f);
    },
    handleDocumentChange(){
      this.$root.saveLocally();
      this.updatePreview();
    },
    updatePreview(){
      let t=this.currentAB.getFullHtmlCode();
      this.$refs.preview.setContent(t);
    },
    selectAB(index){
      this.currentABIndex=index;
      nextTick(()=>{
        this.$refs.codemirrorEditor[index].updateText();
        this.updatePreview();
      })
    },
    closeAB(index){
      this.abs.splice(index,1);
      if(this.currentABIndex===index && index>=this.abs.length){
        this.currentABIndex--;
        if(this.currentABIndex<0) this.currentABIndex=0;
      }
      this.$root.saveABsLocally();
    }
  }
}
</script>
