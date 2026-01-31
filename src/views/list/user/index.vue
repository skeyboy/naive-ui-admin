<template>
  <n-flex vertical>
    <n-card :bordered="false">
      <BasicTable
        :request="loadDataTable"
        :columns="columns"
        :row-key="(row:UserListData) => row.id"
        ref="actionRef"
        @update:checked-row-keys="onCheckedRow"
        :scroll-x="1090"
        :striped="true"
      >
        <template #tableTitle>
          <n-button type="primary" @click="addTable">
            <template #icon>
              <n-icon>
                <PlusOutlined />
              </n-icon>
            </template>
            新建
          </n-button>
        </template>
      </BasicTable>

      <n-modal v-model:show="showModal" :show-icon="false" preset="dialog" title="新建">
        <n-form
          :model="formParams"
          :rules="rules"
          ref="formRef"
          label-placement="left"
          :label-width="80"
          class="py-4"
        >
          <n-form-item label="姓名" path="name">
            <n-input placeholder="请输入姓名" v-model:value="formParams.name" />
          </n-form-item>

          <n-form-item label="昵称" path="nick_name">
            <n-input placeholder="请输入昵称" v-model:value="formParams.nick_name" />
          </n-form-item>

          <n-form-item label="电话" path="phone">
            <n-input placeholder="请输入电话" v-model:value="formParams.phone" />
          </n-form-item>

          <n-form-item label="年龄" path="age">
            <n-input placeholder="请输入年龄" v-model:value="formParams.age" />
          </n-form-item>

          <n-form-item label="当前地址" path="curr_address">
            <n-input
              type="textarea"
              placeholder="请输入地址"
              v-model:value="formParams.curr_address"
            />
          </n-form-item>

          <n-form-item label="地址" path="address">
            <n-input type="textarea" placeholder="请输入地址" v-model:value="formParams.address" />
          </n-form-item>
        </n-form>

        <template #action>
          <n-space>
            <n-button @click="() => (showModal = false)">取消</n-button>
            <n-button type="info" :loading="formBtnLoading" @click="confirmForm">确定</n-button>
          </n-space>
        </template>
      </n-modal>
    </n-card>
  </n-flex>
</template>
<script setup lang="ts">
  import { createUser, getUserTableList } from '@/api/user/user';
  import { BasicTable } from '@/components/Table';
  import { PlusOutlined } from '@vicons/antd';

  import { BasicColumn } from '@/components/Table';
  import { FormRules } from 'naive-ui';
  import { ref } from 'vue';
  const showModal = ref(false);
  const formBtnLoading = ref(false);
  const actionRef = ref();

  const formParams = ref({
    name: '',
    nick_name: '',
    phone: '',
    address: '',
    curr_address: '',
    age: Number(0),
  });
  const formRef: any = ref(null);

  const rules: FormRules = {
    name: {
      required: true,
      trigger: ['blur', 'input'],
      message: '请输入名称',
    },
    age: {
      required: true,
      trigger: ['blur', 'input'],
      message: '请输入年龄',
    },
    curr_address: {
      required: true,
      trigger: ['blur', 'input'],
      message: '请输入当前地址',
    },
    address: {
      required: true,
      trigger: ['blur', 'input'],
      message: '请输入地址',
    },
    date: {
      type: 'number',
      required: true,
      trigger: ['blur', 'change'],
      message: '请选择日期',
    },
  };

  function addTable() {
    showModal.value = true;
  }
  function reloadTable() {
    actionRef.value.reload();
  }
  function confirmForm(e) {
    e.preventDefault();
    formBtnLoading.value = true;
    formRef.value.validate(async (errors) => {
      if (!errors) {
        window['$message'].success('新建成功');

        var params = { ...formParams.value, ...{ is_admin: 0, age: Number(formParams.value.age) } };
        console.log(`createUser ${JSON.stringify(params)}`);
        await createUser(params);

        setTimeout(() => {
          showModal.value = false;
          reloadTable();
        });
      } else {
        window['$message'].error('请填写完整信息');
      }
      formBtnLoading.value = false;
    });
  }

  const loadDataTable = async (res) => {
    const { page, pageSize } = res;
    let result = await getUserTableList({ ...{ page: page, page_size: pageSize } });
    let data = result.data as {
      id: number;
      nick_name: string;
      phone: string;
    }[];

    return {
      page: Number(page),
      pageSize: result.data.length,
      pageCount: 1,
      itemCount: 10,
      list: data,
    };
  };

  const onCheckedRow = async (rowKeys) => {
    console.log(rowKeys);
  };

  interface UserListData {
    id: number;
    name: string;
    phone: string;
    address: string;
  }

  const columns: BasicColumn<UserListData>[] = [
    {
      title: 'id',
      key: 'id',
    },
    {
      title: '昵称',
      key: 'nick_name',
    },
    {
      title: '电话',
      key: 'phone',
    },
    {
      title: '地址',
      key: 'address',
    },
  ];
</script>
<style scoped></style>
