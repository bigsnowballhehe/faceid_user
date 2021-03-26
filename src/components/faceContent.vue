<template>
  <div class="face">
    <div class="container">
      <video id="video" ref="video" preload autoplay loop muted></video>
      <canvas id="canvas" width="581" height="436"></canvas>
      <canvas id="canvas1" width="581" height="436"></canvas>
    </div>
    <span v-if="check">{{ cTime }}</span>
    <div class="btns">
      <button type="primary" @click="start">打开摄像头</button>
      <button type="primary" @click="checkIn">签到</button>
    </div>
    <div class="imgs" v-show="imgView">
      <p>图片</p>
      <canvas id="shortCut" width="140" height="140"></canvas>
    </div>
  </div>
</template>
<script>
import request from '@/utils/request'
import timeFormat from '@/utils/timeFormat'
export default {
  name: 'faceContent',

  data() {
    return {
      saveArray: {},
      imgView: false,
      faceView: false,
      cTime: '',
      check: false,
    }
  },
  methods: {
    // 打开摄像头
    checkIn() {
      let photo = this.getPhoto()
      photo = photo.substring(22)
      request({
        url: '/faceid/post-face',
        method: 'post',
        data: {
          photo: photo,
        },
      }).then((data) => {
        console.log(data)
        if (data.data.code == 200) {
          this.check = true
          this.cTime =
            '打卡成功，时间为' + timeFormat(data.data.time) + '  请勿再次打卡'
        } else {
          this.check = true
          this.cTime = data.data.msg
        }
      })
    },
    start() {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          this.$refs.video.srcObject = stream
        })
        .catch(function (err) {
          /* 处理error */
          console.log(err)
        })
      let canvas1 = document.getElementById('canvas1')
      let context1 = canvas1.getContext('2d')
      context1.strokeStyle = '#69fff1'
      context1.moveTo(190, 118)
      context1.lineTo(390, 118)
      context1.lineTo(390, 318)
      context1.lineTo(190, 318)
      context1.lineTo(190, 118)
      context1.stroke()

      // console.log(saveArray)
    },
    // 获取人像照片
    getPhoto() {
      let video = document.getElementById('video')
      let can = document.getElementById('shortCut')
      let context2 = can.getContext('2d')
      context2.drawImage(video, 210, 130, 210, 210, 0, 0, 140, 140)
      const dataUrl = can.toDataURL('imge/jpeg')

      this.imgView = true
      return dataUrl
    },

    // 截屏
    screenshot() {
      this.getPhoto()
    },
    // 将canvas转化为图片
    convertCanvasToImage(canvas) {
      let image = new Image()
      image.src = canvas.toDataURL('image/png')
      return image
    },

    clearCanvas() {
      let c = document.getElementById('canvas')
      let c1 = document.getElementById('canvas1')
      let cxt = c.getContext('2d')
      let cxt1 = c1.getContext('2d')
      cxt.clearRect(0, 0, 581, 436)
      cxt1.clearRect(0, 0, 581, 436)
    },
    closeFace() {
      console.log('关闭人脸识别窗口')
      this.imgView = false
      this.clearCanvas()
      // 停止侦测
      this.trackerTask.stop()
      console.log(this.trackerTask)
      // 关闭摄像头
      let video = document.getElementById('video')
      video.srcObject.getTracks()[0].stop()
    },
  },
  watch: {
    // faceView(v) {
    //     if (v == false) {
    //         this.closeFace()
    //     }
    // },
    // imgView(v) {
    //     if (v == true) {
    //         this.$message.success({
    //             message: '截取成功！点击保存图片',
    //             offset: 380,
    //             duration: 1000,
    //         })
    //     }
    // },
  },
  destroyed() {},
  created() {
    // request({
    //     url: '/faceid/post-face',
    //     method: 'post',
    //     data: {
    //         photo: 'photo',
    //     },
    // }).then((data) => {
    //     // console.log(data)
    //     //console.log(timeFormat(data.data.time))
    //     this.check = true
    //     this.cTime = timeFormat(data.data.time)
    // })
  },
}
</script>
<style scoped lang="less">
.face {
  .container {
    position: relative;
    width: 581px;
    height: 436px;
    #canvas1 {
      position: absolute;
    }
    video,
    #canvas,
    #canvas1 {
      position: absolute;
      width: 581px;
      height: 436px;
    }
  }
  .btns {
    padding: 10px;
    .tips {
      font-size: 14px;
      color: #666;
      margin: 10px 0;
      line-height: 24px;
    }
  }
  .imgs {
    padding: 10px;
    p {
      font-size: 16px;
    }
  }
}
</style>
