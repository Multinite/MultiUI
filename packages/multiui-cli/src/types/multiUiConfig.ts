export type MultiUIConfig = {
  /**
   * The output directory for components.
   *
   * @default "/src/components/multiui"
   **/
  components_output_dir: string;
  /**
   * The framework you are using.
   **/
  framework: string;
  /**
   * The package manager to use for components.
   **/
  package_manager: string;
  /**
   * The name of every theme you want to use.
   */
  theme_names: string[];
  /**
   * The prefix to use for theme class names.
   *
   * @default "multiui"
   */
  theme_prefix?: string;
};
