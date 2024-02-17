import debounce from 'lodash/debounce';
import { onUnmounted, onMounted } from 'vue';

interface WindowSizeOptions {
  immediate?: boolean;
}

interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

/**
 * 使用debounce函数来延迟执行函数
 * @param fn 要延迟执行的函数
 * @param options 延迟执行的选项
 * @param wait 延迟执行的时间间隔
 */
export function useWindowSizeFn<T>(fn: Fn<T>, options?: WindowSizeOptions, wait = 150) {
  const handleSize: () => void = debounce(fn, wait);

  /**
   * 开始监听窗口大小变化事件
   */
  const start = () => {
    if (options && options.immediate) {
      fn();
    }
    window.addEventListener('resize', handleSize);
  };

  /**
   * 停止监听窗口大小变化事件
   */
  const stop = () => {
    window.removeEventListener('resize', handleSize);
  };

  /**
   * 在组件挂载时开始监听窗口大小变化事件
   */
  onMounted(() => {
    start();
  });

  /**
   * 在组件卸载时停止监听窗口大小变化事件
   */
  onUnmounted(() => {
    stop();
  });
  return [start, stop];
}