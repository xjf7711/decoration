<template>
  <div class="house" z-index="105">
    <div v-cloak id="menu" :style="{left:left+'px'}">
      <van-row>
        <van-col span="3" style="font-weight:bold;cursor:default;">风格:</van-col>
        <van-col
                span="3"
          v-for="obj in styleArr"
          :key="obj.name"
          :style="obj.styleObj"
          @click="styleClick(obj)"
          >{{ obj.name }}</van-col
        >
      </van-row>
      <div>
        <span style="font-weight:bold;cursor:default;">位置:</span>
        <template v-for="obj in posArr">
          <span
                  style="padding: 5px 5px"
            v-if="obj.jpgNameArr.length"
            :key="obj.name"
            :style="obj.styleObj"
            @click="posClick(obj)"
            >{{ obj.name }}</span
          >
        </template>
      </div>
    </div>
    <div
      style="position:absolute;right:5px;"
      :style="{ top: height / 2 + 'px' }"
    >
      <van-button type="danger" icon="arrow" @click="nextClick()"></van-button>
    </div>
    <div
      style="position: absolute;left:5px;"
      :style="{ top: height / 2 + 'px' }"
    >
      <van-button
        type="danger"
        icon="arrow-left"
        @click="upClick()"
      ></van-button>
    </div>
    <div
      v-cloak
      style="color:#00ffff;width:60px;height:60px;border-radius: 30px;left:5px;top:55px;font-size:18px;background: rgba(0, 0, 0, 0.5);position: absolute;"
    >
      <div style="margin-top:17px;width:60px;text-align:center;">
        {{ num }}/{{ N }}
      </div>
    </div>
    <div style="position: absolute;right:20px;top:60px">
      <van-button type="danger" circle @click="audioClick()">
        <i>
          <img
            :src="
              audioBoool
                ? './UI/打开声音.png'
                : './UI/关闭声音.png'
            "
            alt=""
            height="20"
            width="20"
          />
        </i>
      </van-button>
      <van-button type="danger" circle @click="ScreenClick()">
        <i>
          <img
            :src="
              ScreenBoool
                ? './UI/全屏5.png'
                : './UI/退出全屏.png'
            "
            alt=""
            width="18"
            height="18"
          />
        </i>
      </van-button>
      <van-button type="danger" circle @click="rotateClick()">
        <i>
          <img
            :src="
              rotateBoool
                ? './UI/旋转.png'
                : './UI/停止旋转.png'
            "
            alt=""
            width="20"
            height="20"
          />
        </i>
      </van-button>
      <van-button type="danger" circle @click="questionClick()">
        <i>
          <img :src="'./UI/帮助5.png'" alt="" width="22" height="22" />
        </i>
      </van-button>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';
import { MeshBasicMaterial, Texture } from 'three';
import { Toast, Dialog } from 'vant';
import Model from '@/threejs/Model';
import { IPlace, IStyle, path } from '@/threejs/path';

const styleObjArr = path();
@Component
export default class House extends Vue {
  private styleArr = styleObjArr;
  private styleChoose!: IStyle;
  private posArr!: IPlace[];
  private posChoose!: IPlace;
  private width: number = 400;
  private height: number = 300;
  private classPath = '中式/客餐厅';
  private path = '';
  private audioBoool = false;
  private ScreenBoool = true;
  private rotateBoool = true;
  private N = styleObjArr[0].children[0].jpgNameArr.length;
  private num = 1;
  private model!: Model;
  private loading: any; // ElLoadingComponent;
  private left: number = 0;
  @Watch('num')
  private onNumChange() {
    this.loading = Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true, // 禁用背景点击
      loadingType: 'spinner',
      // message: 'Loading',
    });
    // this.$loading({
    //   lock: true,
    //   text: 'Loading',
    //   spinner: 'el-icon-loading',
    //   background: 'rgba(0, 0, 0, 0.7)'
    // });
    this.path = this.classPath + '/' + this.posChoose.jpgNameArr[this.num - 1];
    // console.log(this.path);
    (this.model.mesh
      .material as MeshBasicMaterial).map = this.model.textureLoader.load(
      './风格/' + this.path,
      () => {
        Toast.clear();
        // this.loading.close();
        this.model.animation();
      },
    );
    this.model.animation();
  }

  // get loaded(): boolean {
  //   console.log('get  loaded is begins. ')
  //   return this.model ? this.model.loaded : false
  // }

  // @Watch('model.loaded')
  // onModelLoadedChange(newVal: boolean, oldVal: boolean) {
  //   console.log('this.model.loaded is ', this.model.loaded)
  //   if (this.model.loaded === true) {
  //     this.loading.close()
  //   }
  // }
  @Watch('model')
  private onModelChange() {
    // console.log('this.model changed, and is ', this.model);
    if (this.model && this.model.loaded) {
      // this.loading.close();
      Toast.clear();
    }
  }

  private created() {
    this.styleArr = styleObjArr;
    this.posArr = styleObjArr[0].children;
    this.styleChoose = this.styleArr[0];
    this.posChoose = styleObjArr[0].children[0];
    this.loading = Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true, // 禁用背景点击
      loadingType: 'spinner',
      // message: 'Loading',
    });
    // this.$loading({
    //   lock: true,
    //   text: 'Loading',
    //   spinner: 'el-icon-loading',
    //   background: 'rgba(0, 0, 0, 0.7)'
    // })
  }

  private mounted() {
    this.width = this.$el.clientWidth;
    // console.log('this.width is ', this.width);
    this.left = this.width > 440 ? (this.width - 440) / 2 : 0;
    this.height = this.$el.clientHeight;
    // console.log('this.height is ', this.height);
    this.model = new Model();
    this.model.init(this.$el as HTMLElement);
  }

  private audioClick() {
    if (this.audioBoool) {
      this.audioBoool = false;
      this.model.audio.pause();
    } else {
      this.audioBoool = true;
      this.model.audio.play();
    }
  }

  private ScreenClick() {
    if (this.ScreenBoool) {
      this.ScreenBoool = false;
      this.model.events.requestFullScreen();
    } else {
      this.ScreenBoool = true;
      this.model.events.exitFullscreen();
    }
  }

  private questionClick() {
    Dialog.alert({
      title: '旋转操作',
      message: '按住左键不放上下左右拖动，可以旋转整个场景',
    });
    // this.$alert('按住左键不放上下左右拖动，可以旋转整个场景', '旋转操作', {})
  }

  private rotateClick() {
    if (this.rotateBoool) {
      this.rotateBoool = false;
      this.model.rotateBoool = false;
    } else {
      this.rotateBoool = true;
      this.model.rotateBoool = true;
    }
  }

  private nextClick() {
    if (this.num < this.N) {
      this.num += 1;
    } else {
      this.num = 1;
    }
  }

  private upClick() {
    if (this.num > 1) {
      this.num -= 1;
    } else {
      this.num = this.N;
    }
  }

  private styleClick(styleObj: IStyle) {
    this.loading = Toast.loading({
      forbidClick: true,
      duration: 0,
      loadingType: 'spinner',
      // message: 'Loading',
    });
    // this.$loading({
    //   lock: true,
    //   text: 'Loading',
    //   spinner: 'el-icon-loading',
    //   background: 'rgba(0, 0, 0, 0.7)'
    // });
    this.num = 1;
    this.styleChoose.styleObj.background = null;
    this.posChoose.styleObj.background = null;
    this.styleChoose = styleObj;
    this.styleChoose.styleObj.background = '#409EFF';
    this.posArr = this.styleChoose.children;
    this.posChoose = this.posArr[0];
    this.posArr[0].styleObj.background = '#409EFF';
    this.N = this.posChoose.jpgNameArr.length;
    this.classPath = this.styleChoose.name + '/' + this.posChoose.name;
    this.path = this.classPath + '/' + this.posChoose.jpgNameArr[this.num - 1];
    (this.model.mesh
      .material as MeshBasicMaterial).map = this.model.textureLoader.load(
      './风格/' + this.path,
      () => {
        Toast.clear();
        // this.loading.close();
        this.model.animation();
      },
    );
  }

  private posClick(posObj: IPlace) {
    // console.log('posClick begins .');
    this.loading = Toast.loading({
      duration: 0,
      forbidClick: true,
      // message: 'Loading',
      loadingType: 'spinner',
    });
    // this.$loading({
    //   lock: true,
    //   text: 'Loading',
    //   spinner: 'el-icon-loading',
    //   background: 'rgba(0, 0, 0, 0.7)'
    // });
    this.num = 1;
    this.posChoose.styleObj.background = null;
    this.posChoose = posObj;
    this.N = this.posChoose.jpgNameArr.length;
    this.posChoose.styleObj.background = '#409EFF';
    this.classPath = this.styleChoose.name + '/' + this.posChoose.name;
    this.path = this.classPath + '/' + this.posChoose.jpgNameArr[this.num - 1];
    (this.model.mesh
      .material as MeshBasicMaterial).map = this.model.textureLoader.load(
      './风格/' + this.path,
      () => {
        Toast.clear();
        // this.loading.close();
        this.model.animation();
      },
    );
  }
}
</script>

<style lang="scss" scoped>
.house {
  width: 100vw;
  height: 100vh;
  text-align: center;
}

#menu {
  position: absolute;
  text-align: center;
  bottom: 0;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px 0;
  z-index: 102;
  width: 100vw;
  max-width: 440px;
  height: 80px;
}

#menu > div {
  padding: 5px 0;
}

/*#menu span {*/
/*  display: inline-block;*/
/*  padding: 5px 2px;*/
/*  cursor: pointer;*/
/*}*/

.van-button--danger {
  font-size: 25px !important;
  background: rgba(0, 0, 0, 0.5) !important;
  border-width: 0px !important;
  width: 50px !important;
  height: 50px !important;
}

[v-cloak] {
  display: none;
}
</style>
