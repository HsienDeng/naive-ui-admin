import { defineComponent } from 'vue';
import { NIcon } from 'naive-ui';
import FreshDraggable from 'vuedraggable';
import { ExtensionPuzzleOutline } from '@vicons/ionicons5';
import { componentConfig } from '../../../config/componentConfig';

import('./style/index.less');

export default defineComponent({
  setup() {
    return () => (
      <>
        <div class="left-component-container">
          {componentConfig.value.map((config) => {
            return (
              <>
                <div class="left-component-title">
                  <NIcon>
                    <ExtensionPuzzleOutline />
                  </NIcon>
                  <span>{config.title}</span>
                </div>
                <FreshDraggable
                  class="dragArea list-group"
                  list={config.config}
                  group={{ name: 'people', pull: 'clone', put: false }}
                  item-key="label"
                  sort={false}
                  v-slots={{
                    item: ({ element }) => (
                      <div class="elements-item">
                        <div class="components-body">
                          {/*{element.icon ? <NIcon>{element.icon && element.icon.render()}</NIcon> : null}*/}
                          <span class="components-body-text">{element.tempLabel || element.label}</span>
                        </div>
                      </div>
                    ),
                  }}
                />
              </>
            );
          })}
        </div>
      </>
    );
  },
});
