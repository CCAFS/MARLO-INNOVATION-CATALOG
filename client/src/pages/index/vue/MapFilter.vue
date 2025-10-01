<template>
  <svg height="460" viewBox="0 0 457 401" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g filter="url(#filter0_d_532_106)">
      <g filter="url(#filter1_i_532_106)">
        <circle cx="204" cy="196" r="182" fill="white"></circle>
      </g>
      <circle cx="204" cy="196" r="179" stroke="white" stroke-width="6"></circle>
      <rect x="65.9663" y="53.3652" width="275.201" height="285.27" rx="137.601" fill="url(#pattern0_532_106)"></rect>
    </g>
    <SvgCircle
      v-for="(circle, index) in circleList"
      :key="index"
      :class="circle.class"
      :filter="circle.filter"
      :x="circle.x"
      :y="circle.y"
      :fill="circle.fill"
      :activeIndex="active"
      :index="index"
      :pathD="circle.pathD"
      @click="handleClick" />
    <defs>
      <filter id="filter0_d_532_106" x="18" y="14" width="372" height="372" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
        <feOffset dy="4"></feOffset>
        <feGaussianBlur stdDeviation="2"></feGaussianBlur>
        <feComposite in2="hardAlpha" operator="out"></feComposite>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"></feColorMatrix>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_532_106"></feBlend>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_532_106" result="shape"></feBlend>
      </filter>
      <filter id="filter1_i_532_106" x="22" y="14" width="368" height="368" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
        <feMorphology radius="15" operator="erode" in="SourceAlpha" result="effect1_innerShadow_532_106"></feMorphology>
        <feOffset dx="4" dy="4"></feOffset>
        <feGaussianBlur stdDeviation="21.55"></feGaussianBlur>
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite>
        <feColorMatrix type="matrix" values="0 0 0 0 0.772549 0 0 0 0 0.858824 0 0 0 0 0.870588 0 0 0 0.5 0"></feColorMatrix>
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_532_106"></feBlend>
      </filter>
      <pattern id="pattern0_532_106" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlink:href="#image0_532_106" transform="scale(0.00243902 0.00235294)"></use>
      </pattern>
      <filter id="filter2_d_532_106" x="296" y="1" width="45" height="45" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
        <feOffset dy="4"></feOffset>
        <feGaussianBlur stdDeviation="2"></feGaussianBlur>
        <feComposite in2="hardAlpha" operator="out"></feComposite>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"></feColorMatrix>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_532_106"></feBlend>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_532_106" result="shape"></feBlend>
      </filter>
      <filter id="filter3_d_532_106" x="332" y="31" width="45" height="45" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
        <feOffset dy="4"></feOffset>
        <feGaussianBlur stdDeviation="2"></feGaussianBlur>
        <feComposite in2="hardAlpha" operator="out"></feComposite>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"></feColorMatrix>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_532_106"></feBlend>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_532_106" result="shape"></feBlend>
      </filter>
      <filter id="filter4_d_532_106" x="361" y="68" width="45" height="46" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
        <feOffset dy="4"></feOffset>
        <feGaussianBlur stdDeviation="2"></feGaussianBlur>
        <feComposite in2="hardAlpha" operator="out"></feComposite>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"></feColorMatrix>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_532_106"></feBlend>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_532_106" result="shape"></feBlend>
      </filter>
      <filter id="filter5_d_532_106" x="382" y="108" width="45" height="45" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
        <feOffset dy="4"></feOffset>
        <feGaussianBlur stdDeviation="2"></feGaussianBlur>
        <feComposite in2="hardAlpha" operator="out"></feComposite>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"></feColorMatrix>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_532_106"></feBlend>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_532_106" result="shape"></feBlend>
      </filter>
      <filter id="filter6_d_532_106" x="393" y="153" width="45" height="45" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
        <feOffset dy="4"></feOffset>
        <feGaussianBlur stdDeviation="2"></feGaussianBlur>
        <feComposite in2="hardAlpha" operator="out"></feComposite>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"></feColorMatrix>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_532_106"></feBlend>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_532_106" result="shape"></feBlend>
      </filter>
      <filter id="filter7_d_532_106" x="393" y="199" width="45" height="45" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
        <feOffset dy="4"></feOffset>
        <feGaussianBlur stdDeviation="2"></feGaussianBlur>
        <feComposite in2="hardAlpha" operator="out"></feComposite>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"></feColorMatrix>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_532_106"></feBlend>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_532_106" result="shape"></feBlend>
      </filter>
      <filter id="filter8_d_532_106" x="382" y="246" width="45" height="46" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
        <feOffset dy="4"></feOffset>
        <feGaussianBlur stdDeviation="2"></feGaussianBlur>
        <feComposite in2="hardAlpha" operator="out"></feComposite>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"></feColorMatrix>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_532_106"></feBlend>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_532_106" result="shape"></feBlend>
      </filter>
      <filter id="filter9_d_532_106" x="361" y="287" width="45" height="45" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
        <feOffset dy="4"></feOffset>
        <feGaussianBlur stdDeviation="2"></feGaussianBlur>
        <feComposite in2="hardAlpha" operator="out"></feComposite>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"></feColorMatrix>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_532_106"></feBlend>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_532_106" result="shape"></feBlend>
      </filter>
      <filter id="filter10_d_532_106" x="332" y="324" width="45" height="45" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
        <feOffset dy="4"></feOffset>
        <feGaussianBlur stdDeviation="2"></feGaussianBlur>
        <feComposite in2="hardAlpha" operator="out"></feComposite>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"></feColorMatrix>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_532_106"></feBlend>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_532_106" result="shape"></feBlend>
      </filter>
      <filter id="filter11_d_532_106" x="296" y="356" width="45" height="45" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
        <feOffset dy="4"></feOffset>
        <feGaussianBlur stdDeviation="2"></feGaussianBlur>
        <feComposite in2="hardAlpha" operator="out"></feComposite>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"></feColorMatrix>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_532_106"></feBlend>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_532_106" result="shape"></feBlend>
      </filter>
      <image id="image0_532_106" width="410" height="425" preserveAspectRatio="none" xlink:href="map.png" />
    </defs>
  </svg>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useSharedValue } from './composables/useSharedValue';
import SvgCircle from './SvgCircle.vue';
const { setValue } = useSharedValue();
const circleList = [
  {
    class: 'cursor-pointer',
    filter: 'url(#filter2_d_532_106)',
    x: 300,
    y: 1,
    fill: '#0065BD',
    pathD:
      'M318.495 24.12C317.831 24.12 317.231 23.952 316.695 23.616C316.167 23.28 315.751 22.792 315.447 22.152C315.143 21.504 314.991 20.72 314.991 19.8C314.991 18.88 315.143 18.1 315.447 17.46C315.751 16.812 316.167 16.32 316.695 15.984C317.231 15.648 317.831 15.48 318.495 15.48C319.167 15.48 319.767 15.648 320.295 15.984C320.823 16.32 321.239 16.812 321.543 17.46C321.855 18.1 322.011 18.88 322.011 19.8C322.011 20.72 321.855 21.504 321.543 22.152C321.239 22.792 320.823 23.28 320.295 23.616C319.767 23.952 319.167 24.12 318.495 24.12ZM318.495 22.764C318.887 22.764 319.227 22.66 319.515 22.452C319.803 22.236 320.027 21.908 320.187 21.468C320.355 21.028 320.439 20.472 320.439 19.8C320.439 19.12 320.355 18.564 320.187 18.132C320.027 17.692 319.803 17.368 319.515 17.16C319.227 16.944 318.887 16.836 318.495 16.836C318.119 16.836 317.783 16.944 317.487 17.16C317.199 17.368 316.971 17.692 316.803 18.132C316.643 18.564 316.563 19.12 316.563 19.8C316.563 20.472 316.643 21.028 316.803 21.468C316.971 21.908 317.199 22.236 317.487 22.452C317.783 22.66 318.119 22.764 318.495 22.764Z'
  },
  {
    class: 'cursor-pointer',
    filter: 'url(#filter3_d_532_106)',
    x: 336,
    y: 31,
    fill: '#0D6EA8',
    pathD: 'M354.087 54V46.2L354.771 46.908H352.311V45.6H355.647V54H354.087Z'
  },
  {
    class: 'cursor-pointer',
    filter: 'url(#filter4_d_532_106)',
    x: 365,
    y: 68,
    fill: '#1B7793',
    pathD:
      'M380.428 91.5V90.456L383.764 87.288C384.044 87.024 384.252 86.792 384.388 86.592C384.524 86.392 384.612 86.208 384.652 86.04C384.7 85.864 384.724 85.7 384.724 85.548C384.724 85.164 384.592 84.868 384.328 84.66C384.064 84.444 383.676 84.336 383.164 84.336C382.756 84.336 382.384 84.408 382.048 84.552C381.72 84.696 381.436 84.916 381.196 85.212L380.104 84.372C380.432 83.932 380.872 83.592 381.424 83.352C381.984 83.104 382.608 82.98 383.296 82.98C383.904 82.98 384.432 83.08 384.88 83.28C385.336 83.472 385.684 83.748 385.924 84.108C386.172 84.468 386.296 84.896 386.296 85.392C386.296 85.664 386.26 85.936 386.188 86.208C386.116 86.472 385.98 86.752 385.78 87.048C385.58 87.344 385.288 87.676 384.904 88.044L382.036 90.768L381.712 90.18H386.62V91.5H380.428Z'
  },
  {
    class: 'cursor-pointer',
    filter: 'url(#filter5_d_532_106)',
    x: 386,
    y: 108,
    fill: '#28817F',
    pathD:
      'M404.176 131.12C403.584 131.12 403.004 131.036 402.436 130.868C401.876 130.692 401.404 130.452 401.02 130.148L401.692 128.936C401.996 129.184 402.364 129.384 402.796 129.536C403.228 129.688 403.68 129.764 404.152 129.764C404.712 129.764 405.148 129.652 405.46 129.428C405.772 129.196 405.928 128.884 405.928 128.492C405.928 128.108 405.784 127.804 405.496 127.58C405.208 127.356 404.744 127.244 404.104 127.244H403.336V126.176L405.736 123.32L405.94 123.908H401.428V122.6H407.152V123.644L404.752 126.5L403.936 126.02H404.404C405.436 126.02 406.208 126.252 406.72 126.716C407.24 127.172 407.5 127.76 407.5 128.48C407.5 128.952 407.38 129.388 407.14 129.788C406.9 130.188 406.532 130.512 406.036 130.76C405.548 131 404.928 131.12 404.176 131.12Z'
  },
  {
    class: 'cursor-pointer',
    filter: 'url(#filter6_d_532_106)',
    x: 397,
    y: 153,
    fill: '#368A6A',
    pathD:
      'M411.836 174.092V173.012L415.976 167.6H417.644L413.564 173.012L412.784 172.772H419.444V174.092H411.836ZM416.444 176V174.092L416.492 172.772V171.08H417.956V176H416.444Z'
  },
  {
    class: 'cursor-pointer',
    filter: 'url(#filter7_d_532_106)',
    x: 397,
    y: 199,
    fill: '#439255',
    pathD:
      'M415.308 222.12C414.716 222.12 414.136 222.036 413.568 221.868C413.008 221.692 412.536 221.452 412.152 221.148L412.812 219.936C413.116 220.184 413.484 220.384 413.916 220.536C414.356 220.688 414.812 220.764 415.284 220.764C415.836 220.764 416.268 220.648 416.58 220.416C416.9 220.184 417.06 219.872 417.06 219.48C417.06 219.216 416.992 218.984 416.856 218.784C416.728 218.584 416.496 218.432 416.16 218.328C415.832 218.224 415.38 218.172 414.804 218.172H412.776L413.208 213.6H418.14V214.908H413.784L414.6 214.164L414.276 217.584L413.46 216.852H415.152C415.984 216.852 416.652 216.964 417.156 217.188C417.668 217.404 418.04 217.708 418.272 218.1C418.512 218.484 418.632 218.924 418.632 219.42C418.632 219.908 418.512 220.356 418.272 220.764C418.032 221.172 417.664 221.5 417.168 221.748C416.68 221.996 416.06 222.12 415.308 222.12Z'
  },
  {
    class: 'cursor-pointer',
    filter: 'url(#filter8_d_532_106)',
    x: 386,
    y: 246,
    fill: '#509B40',
    pathD:
      'M404.902 269.62C404.142 269.62 403.49 269.46 402.946 269.14C402.402 268.812 401.986 268.34 401.698 267.724C401.41 267.108 401.266 266.348 401.266 265.444C401.266 264.484 401.438 263.672 401.782 263.008C402.134 262.344 402.618 261.84 403.234 261.496C403.858 261.152 404.574 260.98 405.382 260.98C405.806 260.98 406.21 261.024 406.594 261.112C406.986 261.2 407.318 261.336 407.59 261.52L407.014 262.696C406.782 262.544 406.53 262.44 406.258 262.384C405.994 262.32 405.714 262.288 405.418 262.288C404.626 262.288 403.998 262.532 403.534 263.02C403.07 263.508 402.838 264.228 402.838 265.18C402.838 265.332 402.842 265.512 402.85 265.72C402.858 265.92 402.886 266.124 402.934 266.332L402.454 265.804C402.598 265.476 402.794 265.204 403.042 264.988C403.298 264.764 403.598 264.596 403.942 264.484C404.294 264.372 404.674 264.316 405.082 264.316C405.634 264.316 406.126 264.424 406.558 264.64C406.99 264.848 407.334 265.148 407.59 265.54C407.846 265.924 407.974 266.376 407.974 266.896C407.974 267.448 407.838 267.928 407.566 268.336C407.294 268.744 406.926 269.06 406.462 269.284C405.998 269.508 405.478 269.62 404.902 269.62ZM404.818 268.396C405.138 268.396 405.422 268.34 405.67 268.228C405.918 268.108 406.11 267.94 406.246 267.724C406.39 267.508 406.462 267.256 406.462 266.968C406.462 266.528 406.31 266.18 406.006 265.924C405.702 265.668 405.294 265.54 404.782 265.54C404.446 265.54 404.15 265.604 403.894 265.732C403.646 265.852 403.446 266.02 403.294 266.236C403.15 266.452 403.078 266.7 403.078 266.98C403.078 267.236 403.146 267.472 403.282 267.688C403.418 267.904 403.614 268.076 403.87 268.204C404.134 268.332 404.45 268.396 404.818 268.396Z'
  },
  {
    class: 'cursor-pointer',
    filter: 'url(#filter9_d_532_106)',
    x: 365,
    y: 287,
    fill: '#5EA42B',
    pathD: 'M381.782 310L385.25 302.224L385.658 302.92H380.894L381.638 302.164V304.348H380.186V301.6H386.714V302.644L383.45 310H381.782Z'
  },
  {
    class: 'cursor-pointer',
    filter: 'url(#filter10_d_532_106)',
    x: 336,
    y: 324,
    fill: '#6BAE17',
    pathD:
      'M354.486 347.12C353.79 347.12 353.186 347.016 352.674 346.808C352.162 346.6 351.766 346.308 351.486 345.932C351.206 345.548 351.066 345.1 351.066 344.588C351.066 344.076 351.202 343.644 351.474 343.292C351.746 342.94 352.138 342.672 352.65 342.488C353.162 342.304 353.774 342.212 354.486 342.212C355.198 342.212 355.81 342.304 356.322 342.488C356.842 342.672 357.238 342.944 357.51 343.304C357.79 343.656 357.93 344.084 357.93 344.588C357.93 345.1 357.786 345.548 357.498 345.932C357.218 346.308 356.818 346.6 356.298 346.808C355.786 347.016 355.182 347.12 354.486 347.12ZM354.486 345.896C355.062 345.896 355.518 345.776 355.854 345.536C356.19 345.296 356.358 344.964 356.358 344.54C356.358 344.124 356.19 343.796 355.854 343.556C355.518 343.316 355.062 343.196 354.486 343.196C353.91 343.196 353.458 343.316 353.13 343.556C352.802 343.796 352.638 344.124 352.638 344.54C352.638 344.964 352.802 345.296 353.13 345.536C353.458 345.776 353.91 345.896 354.486 345.896ZM354.486 343.028C353.838 343.028 353.282 342.944 352.818 342.776C352.354 342.6 351.994 342.348 351.738 342.02C351.49 341.684 351.366 341.284 351.366 340.82C351.366 340.34 351.494 339.928 351.75 339.584C352.014 339.232 352.382 338.96 352.854 338.768C353.326 338.576 353.87 338.48 354.486 338.48C355.11 338.48 355.658 338.576 356.13 338.768C356.602 338.96 356.97 339.232 357.234 339.584C357.498 339.928 357.63 340.34 357.63 340.82C357.63 341.284 357.502 341.684 357.246 342.02C356.998 342.348 356.638 342.6 356.166 342.776C355.694 342.944 355.134 343.028 354.486 343.028ZM354.486 342.068C354.982 342.068 355.374 341.964 355.662 341.756C355.95 341.54 356.094 341.252 356.094 340.892C356.094 340.516 355.946 340.224 355.65 340.016C355.354 339.808 354.966 339.704 354.486 339.704C354.006 339.704 353.622 339.808 353.334 340.016C353.046 340.224 352.902 340.516 352.902 340.892C352.902 341.252 353.042 341.54 353.322 341.756C353.61 341.964 353.998 342.068 354.486 342.068Z'
  },
  {
    class: 'cursor-pointer',
    filter: 'url(#filter11_d_532_106)',
    x: 300,
    y: 356,
    fill: '#7AB800',
    pathD:
      'M318.098 370.48C318.866 370.48 319.518 370.644 320.054 370.972C320.598 371.292 321.014 371.76 321.302 372.376C321.59 372.992 321.734 373.752 321.734 374.656C321.734 375.616 321.558 376.428 321.206 377.092C320.862 377.756 320.382 378.26 319.766 378.604C319.15 378.948 318.434 379.12 317.618 379.12C317.194 379.12 316.79 379.076 316.406 378.988C316.022 378.9 315.69 378.764 315.41 378.58L315.986 377.404C316.218 377.556 316.47 377.664 316.742 377.728C317.014 377.784 317.294 377.812 317.582 377.812C318.374 377.812 319.002 377.568 319.466 377.08C319.93 376.592 320.162 375.872 320.162 374.92C320.162 374.768 320.158 374.592 320.15 374.392C320.142 374.184 320.114 373.976 320.066 373.768L320.546 374.296C320.41 374.624 320.214 374.9 319.958 375.124C319.702 375.34 319.402 375.504 319.058 375.616C318.714 375.728 318.334 375.784 317.918 375.784C317.374 375.784 316.882 375.68 316.442 375.472C316.01 375.256 315.666 374.956 315.41 374.572C315.154 374.18 315.026 373.724 315.026 373.204C315.026 372.644 315.162 372.164 315.434 371.764C315.706 371.356 316.074 371.04 316.538 370.816C317.01 370.592 317.53 370.48 318.098 370.48ZM318.182 371.704C317.862 371.704 317.578 371.764 317.33 371.884C317.082 371.996 316.886 372.16 316.742 372.376C316.606 372.584 316.538 372.836 316.538 373.132C316.538 373.572 316.69 373.92 316.994 374.176C317.298 374.432 317.706 374.56 318.218 374.56C318.554 374.56 318.85 374.5 319.106 374.38C319.362 374.252 319.562 374.08 319.706 373.864C319.85 373.64 319.922 373.392 319.922 373.12C319.922 372.856 319.854 372.62 319.718 372.412C319.582 372.196 319.386 372.024 319.13 371.896C318.874 371.768 318.558 371.704 318.182 371.704Z'
  }
];

const active = ref<number | null>(null);
const handleClick = (index: number) => {
  active.value = index;
  setValue(index);
};
</script>
