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
    <template #heading>Написать нам</template>

    Get official tools and libraries for your project:
    <a href="https://pinia.vuejs.org/" target="_blank" rel="noopener">Pinia</a>,
    <a href="https://router.vuejs.org/" target="_blank" rel="noopener">Vue Router</a>,
    <a href="https://test-utils.vuejs.org/" target="_blank" rel="noopener">Vue Test Utils</a>, and
    <a href="https://github.com/vuejs/devtools" target="_blank" rel="noopener">Vue Dev Tools</a>. If
    you need more resources, we suggest paying
    <a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">Awesome Vue</a>
    a visit.
  </WelcomeItem>
</template>

<style scoped>
@media (max-width: 600px) {
  .highlight-code {
    max-width: 250px;
}
}
</style>