<script setup lang="ts">
import { ref } from 'vue'
import { defineAsyncComponent } from 'vue'
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
import VCodeBlock from '@wdns/vue-code-block'
import { estateStore } from '@/stores/estate'

const estate = estateStore()

const code = ref(`<iframe
  src="https://genplan.zae.life/embed"
  style="width:450px; height:700px; 
   border:0; overflow:hidden!important;">
</iframe>`)

const Polygon = defineAsyncComponent(() =>
  import('../components/Polygon.vue')
)
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Пример виджета</template>
    <div class="highlight-code">
      <VCodeBlock
      :code="code"
      highlightjs
      label="Скопируйте код для встраивания на ваш сайт"
      lang="javascript"
      theme="neon-bunny"
    />
    </div>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Пример карты</template>
    <Polygon :center="estate.cityCenter" :features="estate.cityGeometry" />
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Получай заявки</template>
    <p>После добавления кода виждета ты сможешь сразу получить готовую карту с участками.</p>
  </WelcomeItem>
</template>

<style scoped>
@media (max-width: 600px) {
  .highlight-code {
    max-width: 250px;
}
}
</style>