<template>
  <div id="home">
    <!--头部-->
    <t-header></t-header>

    <main>
      <h2>
        <span class="icon icon-board"></span>
        我的看板
      </h2>
      <ul class="board-items">
        <router-link :to="{name:'Board',params:{id:board.id}}" tag="li" class="board-item" v-for="(board, index) of boards" :key="index">

          <span class="title">{{ board.name }}</span>

        </router-link>

        <li class="board-item create-new-board">
          <textarea
            class="title form-field-input"
            placeholder="创建新看板"
            ref="newBoardName"
            @blur="postBoard"
          ></textarea>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import THeader from "@/components/THeader";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    THeader,
  },
  computed: {
    ...mapState("board", {
      boards: (state) => state.boards,
      inited: (state) => state.inited
    }),
  },
  created() {
    // 判断store中是否存在卡片的信息，没有则重新发送请求
    if (!this.inited) {
      this.$store.dispatch("board/getBoards");
    }
  },
  methods: {
    postBoard() {
      let val = this.$refs.newBoardName.value;
      if (val.trim() !== "") {
        try {
          this.$store.dispatch("board/postBoard", {
            name:val
          });
          this.$message.success('面板创建成功')
          this.$refs.newBoardName.value = null
        } catch (error) {}
      }
      console.log(123);
    },
  },
};
</script>