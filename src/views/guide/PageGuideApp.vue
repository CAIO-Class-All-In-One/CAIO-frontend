<script setup lang="ts">
import help from "~/document";
import { reactive } from "vue";
import { nextTick } from "vue";


const data = reactive({
  // md原始数据
  helpData: "",
  // md转成html标签后的数据
  help: "",
  // 目录数据
  titleData: [],
  // 目录树配置
  defaultProps: {
    children: "children",
    label: "label",
  },
});

const created = () => {
  data.helpData = help;
  
  getTitle();
  nextTick(() => {
    resetId();
  });
  return;
};

const getTitle = () => {
  // 提取出所有#和后面标题，放到一个数组中
  let titleList = data.helpData.match(/#+.+/g);
  // 把每个标题出现次数统计出来，必须保证标题唯一，全部使用1.1.1.1这是一个好办法
  // 因为marked会把#后面的内容添加为id，如果标题重复，锚点跳转会只跳第一个
  let count = titleList.reduce((obj, name) => {
    if (name in obj) {
      obj[name]++;
    } else {
      obj[name] = 1;
    }
    return obj;
  }, {});
  // 删除只出现了一次的
  for (let item in count) {
    if (count[item] == 1) {
      delete count[item];
    }
  }
  // console.log(count);
  // 能保证标题唯一的话，可以不用加这行代码
  titleList = titleList.map((item, index) => (item = index + "$" + item));
  // console.log(titleList);
  // 最后一个各级别的标题
  let nowLabel = [];
  // 生成的标题
  let title = [];
  // 当前对象
  let cur;
  for (let item of titleList) {
    // 当前目录级别
    let level = item.match(/#+/)[0].length;
    // 其父级目录文字
    let label = nowLabel[level - 2];
    // 更新当前目录文字
    nowLabel[level - 1] = item;
    if (level == 1) {
      cur = {
        level: level,
        label: item,
        value: item,
        children: [],
      };
      title.push(cur);
    } else {
      let obj = getObj(label, cur, level);
      // 把当前目录添加到其父级目录对象的children里
      obj.children.push({
        level: level,
        label: item,
        value: item,
        children: [],
      });
    }
  }
  // 这里是去除标题里的#和空格(如果上面没添加$和索引的话)
  data.titleData = removeTitleData(title);
};

const getObj = (label, cur, level) => {
  if (level - 1 > cur.level) {
    for (let item of cur.children) {
      let res = getObj(label, item, level);
      if (res) {
        return res;
      } else {
        continue;
      }
    }
  } else {
    if (cur.label == label) {
      return cur;
    } else {
      return false;
    }
  }
};
const removeTitleData = (title) => {
  return title.map((item) => {
    // 这里因为标题里添加$和索引了，如果没有添加，可以不需要这行
    item.label = item.label.split("$")[1];
    item.label = item.label.replace(/#+\s+/, "");
    if (item.children.length > 0) {
      item.children = removeTitleData(item.children);
    }
    return item;
  });
};
const resetId = () => {
  for (let i = 1; i < 7; i++) {
    let h = document.getElementsByTagName("h" + i);
    for (let j = 0; j < h.length; j++) {
      h[j].setAttribute("id", h[j].innerHTML);
    }
    // console.log(h);
  }
};
const toTitle = (data) => {
  // 新建一个a标签用来做跳转
  let a = document.createElement("a");
  // 这里就是marked自动添加id的坑 1.2.1.2会变成 1212 ，把点会去掉
  // 第二个坑是会把空格转成 "-"
  // console.log(data.label.replace(" ", "-").replace(/[.]{1}/g, ""));
  // 设置锚点，这里直接用label是因为我重新手动设置id为内容了
  a.href = "#" + decodeURI(data.label);
  // 触发a的点击事件进行跳转
  a.click();
};

</script>

<template>
  <PageBaseHeader />
  <el-tree
      class="titleTree"
      :data="data.titleData"
      accordion
      :props="data.defaultProps"
      @node-click="toTitle"
      
    ></el-tree>

  <div class="contain" v-html="help"></div>
</template>

<style></style>
