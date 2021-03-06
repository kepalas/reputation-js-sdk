export interface IPassportHistoryFilter {
  factProviderAddress?: string;

  /**
   * Fact key
   */
  key?: string;

  /**
   * Block nr to scan from
   */
  startBlock?: number;

  /**
   * Block nr to scan to
   */
  endBlock?: number | 'latest';
}
