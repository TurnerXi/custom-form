import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';

Vue.config.productionTip = false

Vue.directive('dragger', {
    inserted(el, binding) {
        const data = binding.value;
        el.draggable = true;
        el.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData("text", JSON.stringify(data));
        })
    }
})

Vue.directive('dropper', {
    inserted(el, binding) {
        const callback = binding.value;
        if (typeof callback !== 'function') return;

        el.addEventListener('dragover', (e) => {
            try {
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
            } catch (e) {
                console.error(e);
            }
        })
        el.addEventListener('drop', (e) => {
            try {
                let text = e.dataTransfer.getData("text");
                if (text && text.trim()) {
                    const data = JSON.parse(text.trim());
                    callback.call(null, data, e);
                }
            } catch (e) {
                console.error(e);
            }
        })
    }
})

Vue.use(ElementUI, {
    size: 'mini',
    zIndex: 3000
});

new Vue({
    render: h => h(App),
}).$mount('#app')